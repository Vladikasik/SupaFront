"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useSenderFlow } from "@/features/sender-flow/context";
import { createGift } from "@/entities/gift/api";
import { upsertUser } from "@/entities/user/api";
import { v4 as uuidv4 } from "uuid";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import { GiftStatus, Gift } from "@/entities/gift/types";

const schema = z.object({
  receiverEmail: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { ready, authenticated, login, user } = usePrivy();
  const { state, setState } = useSenderFlow();
  const router = useRouter();
  const [logs, setLogs] = useState<Array<{message: string; type: 'info' | 'error' | 'success'}>>([]);

  const addLog = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    console.log(`[${type.toUpperCase()}] ${message}`);
    setLogs(prev => [...prev, {message, type}]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    if (!state.amount || !state.type) {
      addLog("Missing amount or gift type", "error");
      alert("Missing amount or gift type");
      return;
    }
    
    const senderEmail = user?.email?.address;
    if (!senderEmail) {
      addLog("Sender email not found. Please login again.", "error");
      alert("Sender email not found. Please login again.");
      return;
    }

    addLog(`Starting gift creation process: $${state.amount} ${state.type} gift for ${data.receiverEmail}`, "info");
    
    try {
      // Generate gift ID early so we can use it consistently
      const giftId = uuidv4();
      addLog(`Generated gift ID: ${giftId}`, "info");
      
      // 1. Create / fetch Privy user & Solana wallet for the receiver
      addLog("Creating/fetching Privy user and Solana wallet for receiver...", "info");
      const privyRes = await fetch("/api/privy/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.receiverEmail }),
        cache: 'no-store'
      });
      
      if (!privyRes.ok) {
        const errorData = await privyRes.json().catch(() => ({ error: "Unknown error" }));
        console.error("Privy user creation failed:", errorData);
        addLog(`Privy API error: ${errorData.error || privyRes.statusText}`, "error");
        throw new Error(`Failed to create wallet: ${errorData.error || privyRes.statusText}`);
      }
      
      const privyData = await privyRes.json();
      const walletAddress = privyData.walletAddress;
      addLog(`Receiver wallet: ${walletAddress}`, "success");
      
      if (!walletAddress) {
        addLog("No wallet address returned from Privy", "error");
        throw new Error("No wallet address returned");
      }

      // 2. Upsert receiver into Users table
      addLog(`Saving user to database: ${data.receiverEmail} -> ${walletAddress}`, "info");
      await upsertUser(data.receiverEmail, walletAddress);
      addLog("User saved/updated in database", "success");

      // 3. Create the gift with all details from context
      const giftData: Partial<Gift> = {
        gift_id: giftId,
        amount: state.amount,
        sender_email: senderEmail,
        receiver_email: data.receiverEmail,
        token: state.type === "token" ? "SOL" : state.type === "staking" ? "SOL_STAKED" : "NFT",
        status: "pending" as GiftStatus,
        receiver_wallet: walletAddress,
        is_staked: state.type === "staking",
      };
      
      addLog(`Creating gift in database: ${JSON.stringify(giftData, null, 2)}`, "info");
      const gift = await createGift(giftData);
      addLog("Gift created successfully in database", "success");

      // 4. Update context with created gift data
      setState((prev) => ({
        ...prev,
        senderEmail,
        receiverEmail: data.receiverEmail,
        receiverWallet: walletAddress,
        giftId,
      }));
      
      addLog("Proceeding to payment page...", "info");
      // Navigate to payment page
      router.push(`/sender/pay`);
    } catch (e) {
      console.error("Gift creation error:", e);
      addLog(`Gift creation failed: ${(e as Error).message}`, "error");
      alert("Failed to create gift: " + (e as Error).message);
    }
  };

  if (!ready) return <p className="text-center py-10">Loading...</p>;

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold">Login Required</h1>
        <p className="text-gray-700 text-center">Please login with your email to continue checkout.</p>
        <Button onClick={() => login()}>Login with Privy</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="mb-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-sm font-medium">Gift Summary:</p>
        <p className="text-sm">Amount: ${state.amount}</p>
        <p className="text-sm">Type: {state.type}</p>
        <p className="text-sm">Sender: {user?.email?.address ?? "Unknown"}</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input placeholder="Receiver email" {...register("receiverEmail")} />
          {errors.receiverEmail && (
            <p className="text-red-600 text-sm mt-1">{errors.receiverEmail.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Continue to Pay"}
        </Button>
      </form>
      
      {/* Log panel */}
      {logs.length > 0 && (
        <div className="mt-8 border rounded-md overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h3 className="font-medium text-sm">Process Logs</h3>
          </div>
          <div className="max-h-60 overflow-y-auto p-2">
            {logs.map((log, i) => (
              <div 
                key={i} 
                className={`p-2 text-sm mb-1 rounded ${
                  log.type === 'error' ? 'bg-red-50 text-red-700' : 
                  log.type === 'success' ? 'bg-green-50 text-green-700' :
                  'bg-blue-50 text-blue-700'
                }`}
              >
                {log.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 