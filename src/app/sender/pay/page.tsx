"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { generateReference, generateSolanaPayUrl } from "@/shared/lib/solana";
import QRCode from "qrcode.react";
import { useSenderFlow } from "@/features/sender-flow/context";
import { supabase } from "@/shared/lib/supabaseClient";
import { updateGiftStatus } from "@/entities/gift/api";
import { Connection, clusterApiUrl, PublicKey, Cluster } from "@solana/web3.js";
import { findReference, validateTransfer } from "@solana/pay";
import BigNumber from "bignumber.js";
import { Button } from "@/shared/ui/Button";

export default function PayPage() {
  const { state } = useSenderFlow();
  const [status, setStatus] = useState<string>("pending");
  const [logs, setLogs] = useState<Array<{timestamp: string, message: string; type: 'info' | 'error' | 'success' | 'warning'}>>([]);
  
  const addLog = (message: string, type: 'info' | 'error' | 'success' | 'warning' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
    setLogs(prev => [...prev, {timestamp, message, type}]);
  };

  const { url, reference } = useMemo(() => {
    const ref = generateReference();
    const recipientWallet = state.receiverWallet || "Ho7jHoXYj98jkLk2vrgRXrZaUL7D78WwdA7QuNF6VpH5";
    
    const url = generateSolanaPayUrl({
      recipient: recipientWallet,
      amount: state.amount ?? 0,
      reference: ref,
      label: "Breakout Gift",
      message: "Gift payment",
    });
    
    return { url, reference: ref };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.amount, state.receiverWallet]);

  // Log once when URL is first generated
  useEffect(() => {
    if (!reference) return;
    const recipientWallet = state.receiverWallet || "Ho7jHoXYj98jkLk2vrgRXrZaUL7D78WwdA7QuNF6VpH5";
    addLog(`Payment recipient wallet: ${recipientWallet}`, "info");
    addLog(`Payment reference generated: ${reference.toString()}`, "info");
    addLog(`Solana Pay URL generated: ${url.toString().substring(0, 50)}...`, "info");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  useEffect(() => {
    if (!state.giftId) {
      addLog("No gift ID found in state", "error");
      return;
    }
    
    addLog(`Setting up realtime listener for gift: ${state.giftId}`, "info");
    
    const channel = supabase
      .channel("gift-status")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "gifts", filter: `gift_id=eq.${state.giftId}` },
        (payload) => {
          const newStatus = payload.new.status as string;
          addLog(`Gift status changed via realtime: ${payload.old.status} -> ${newStatus}`, "success");
          setStatus(newStatus);
          if (newStatus === "paid") {
            addLog("Payment confirmed! Redirecting to success page...", "success");
            window.location.href = `/sender/success?giftId=${state.giftId}`;
          }
        }
      )
      .subscribe();

    addLog("Realtime subscription active", "info");

    return () => {
      addLog("Cleaning up realtime subscription", "info");
      channel.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.giftId]);

  const refreshStatus = useCallback(async () => {
    if (!state.giftId) {
      addLog("Cannot refresh - no gift ID found", "error");
      return;
    }
    
    addLog("Manually refreshing gift status...", "info");
    
    try {
      const { data, error } = await supabase
        .from("gifts")
        .select("status")
        .eq("gift_id", state.giftId)
        .single();
        
      if (error) {
        addLog(`Error fetching gift status: ${error.message}`, "error");
        return;
      }
      
      if (data) {
        addLog(`Current gift status: ${data.status}`, "info");
        setStatus(data.status as string);
        
        if (data.status === "paid") {
          addLog("Payment confirmed! Redirecting to success page...", "success");
          window.location.href = `/sender/success?giftId=${state.giftId}`;
        }
      } else {
        addLog("Gift not found in database", "warning");
      }
    } catch (err) {
      addLog(`Error during refresh: ${(err as Error).message}`, "error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.giftId]);

  useEffect(() => {
    if (!reference) {
      addLog("No payment reference available", "warning");
      return;
    }

    const network: Cluster = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster) || "devnet";
    addLog(`Using Solana ${network} network`, "info");
    
    const connection = new Connection(clusterApiUrl(network), "confirmed");
    addLog("Connected to Solana network", "info");

    const recipientWallet = state.receiverWallet || "Ho7jHoXYj98jkLk2vrgRXrZaUL7D78WwdA7QuNF6VpH5";
    const amountBN = new BigNumber(state.amount ?? 0);
    
    addLog(`Starting payment polling for ${amountBN.toString()} SOL to ${recipientWallet}`, "info");
    addLog("Waiting for payment confirmation...", "info");

    let timer: NodeJS.Timeout;
    let pollCount = 0;

    const poll = async () => {
      pollCount++;
      
      if (pollCount % 10 === 0) {
        addLog(`Still waiting for payment... (poll attempt ${pollCount})`, "info");
      }
      
      try {
        const signatureInfo = await findReference(connection, reference, { finality: "confirmed" });
        addLog(`Transaction found on-chain: ${signatureInfo.signature}`, "success");

        await validateTransfer(connection, signatureInfo.signature, {
          recipient: new PublicKey(recipientWallet),
          amount: amountBN,
        });

        addLog("Payment validated successfully on-chain!", "success");
        setStatus("paid");

        if (state.giftId) {
          addLog(`Updating gift status to 'paid' in database...`, "info");
          await updateGiftStatus(state.giftId, "paid");
          addLog("Gift status updated to 'paid' in database", "success");
        }

        addLog("Redirecting to success page...", "info");
        window.location.href = `/sender/success?giftId=${state.giftId}`;
      } catch (error: any) {
        // findReference throws FindReferenceError until the tx is found; ignore until then
        if (error?.name !== "FindReferenceError" && error?.name !== "ValidateTransferError") {
          addLog(`Error during payment polling: ${error.message || "Unknown error"}`, "error");
          console.error("Error while polling for payment:", error);
        }
        // keep polling
      }
    };

    // first poll immediately then every 3 seconds
    poll();
    timer = setInterval(poll, 3000);
    addLog("Payment polling started (checking every 3 seconds)", "info");

    return () => {
      addLog("Stopping payment polling", "info");
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  if (!state.amount) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <h1 className="text-2xl font-semibold text-red-600">Missing Data</h1>
        <p className="text-gray-700">Gift amount not found. Please restart the sender flow.</p>
        <Button onClick={() => window.location.href = "/sender/amount"}>Start Over</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Pay with Solana</h1>
      
      {/* Payment information card */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center mb-4">
        <p className="text-gray-700 mb-2">Amount: <span className="font-bold">{state.amount} SOL</span></p>
        <p className="text-gray-700 mb-2">Recipient: <span className="font-mono text-xs">{state.receiverWallet?.substring(0, 10)}...{state.receiverWallet?.substring(state.receiverWallet.length - 10)}</span></p>
        <p className="text-gray-700">Gift ID: <span className="font-mono text-xs">{state.giftId}</span></p>
      </div>
      
      <QRCode value={url.toString()} size={256} />
      <p className="text-gray-700">Scan QR code with your Solana wallet to pay</p>
      
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          status === 'pending' ? 'bg-yellow-500 animate-pulse' : 
          status === 'paid' ? 'bg-green-500' : 
          'bg-gray-500'
        }`}></div>
        <p className="font-medium">
          Status: {status === 'pending' ? 'Waiting for payment' : status}
        </p>
      </div>
      
      <button
        onClick={refreshStatus}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Refresh Status
      </button>
      
      {/* Log panel */}
      <div className="w-full max-w-md mt-8 border rounded-md overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
          <h3 className="font-medium text-sm">Payment Process Logs</h3>
          <button 
            onClick={() => setLogs([])}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            Clear
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto p-2">
          {logs.length === 0 ? (
            <p className="text-center text-gray-500 py-4 text-sm">No logs yet</p>
          ) : (
            logs.map((log, i) => (
              <div 
                key={i} 
                className={`p-2 text-xs mb-1 rounded ${
                  log.type === 'error' ? 'bg-red-50 text-red-700' : 
                  log.type === 'success' ? 'bg-green-50 text-green-700' : 
                  log.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-blue-50 text-blue-700'
                }`}
              >
                <span className="font-mono">{log.timestamp}</span> - {log.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 