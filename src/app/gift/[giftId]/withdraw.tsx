"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import { Gift } from "@/entities/gift/types";
import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import * as web3 from "@solana/web3.js";

interface WithdrawPageProps {
  gift: Gift;
}

export function WithdrawPage({ gift }: WithdrawPageProps) {
  const [destinationWallet, setDestinationWallet] = useState("");
  const [amount, setAmount] = useState<string>(gift.amount?.toString() || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const router = useRouter();
  const { user, ready: privyReady, authenticated } = usePrivy();
  const { ready: walletsReady, wallets } = useSolanaWallets();

  const handleWithdraw = async () => {
    // Trim whitespace and remove any invisible characters
    const cleanedWallet = destinationWallet.trim().replace(/[\s\u200B-\u200D\uFEFF]/g, '');
    
    if (!cleanedWallet) {
      setError("Please enter a destination wallet address");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    // Validate solana address first
    let destPubkey: web3.PublicKey;
    try {
      // Additional validation for base58 characters
      const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
      if (!base58Regex.test(cleanedWallet)) {
        setError("Invalid wallet address format. Please check for any special characters or spaces.");
        return;
      }
      
      destPubkey = new web3.PublicKey(cleanedWallet);
      
      // Additional check to ensure it's a valid public key
      if (!web3.PublicKey.isOnCurve(destPubkey.toBuffer())) {
        setError("Invalid Solana public key");
        return;
      }
    } catch (e) {
      console.error("Address validation error:", e);
      setError("Invalid Solana address. Please check the address and try again.");
      return;
    }

    if (!privyReady || !authenticated || !walletsReady) {
      setError("Wallet not ready. Please ensure you're logged in.");
      return;
    }

    // Get the user's Solana wallet
    const wallet = wallets?.[0];
    if (!wallet) {
      setError("No Solana wallet found. Please ensure you have a wallet connected.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const network: web3.Cluster = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as web3.Cluster) || "devnet";
      const connection = new web3.Connection(web3.clusterApiUrl(network), "confirmed");

      const senderAddress = wallet.address;
      if (!senderAddress) {
        setError("Sender wallet address not found");
        setIsSubmitting(false);
        return;
      }

      console.log("[Withdraw] Building transaction...");
      console.log("[Withdraw] From:", senderAddress);
      console.log("[Withdraw] To:", cleanedWallet);
      console.log("[Withdraw] Amount:", amount, "SOL");

      const lamports = Math.round(parseFloat(amount) * web3.LAMPORTS_PER_SOL);

      // Create the transaction
      const transaction = new web3.Transaction();
      transaction.add(
        web3.SystemProgram.transfer({
          fromPubkey: new web3.PublicKey(senderAddress),
          toPubkey: destPubkey,
          lamports,
        })
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new web3.PublicKey(senderAddress);

      console.log("[Withdraw] Sending transaction via Privy wallet...");

      // Send the transaction using the wallet's sendTransaction method
      if (!wallet.sendTransaction) {
        setError("Wallet does not support sending transactions");
        return;
      }

      const signature = await wallet.sendTransaction(transaction, connection);

      console.log("[Withdraw] Transaction sent! Signature:", signature);
      setTxSignature(signature);

      // Show success for a moment before redirecting
      setTimeout(() => {
      router.push(`/gift/${gift.gift_id}`);
      }, 3000);
    } catch (err: any) {
      console.error("[Withdraw] Error:", err);
      setError(err.message || "Failed to send transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clean the input as user types
    const value = e.target.value.trim();
    setDestinationWallet(value);
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Withdraw Funds
        </h1>

      <div className="space-y-6">
        <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Amount (SOL)
          </label>
            <div className="relative">
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 text-lg border-2 rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            placeholder="0.00"
            disabled={isSubmitting}
            min="0"
            step="0.000001"
          />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                SOL
              </div>
            </div>
        </div>

        <div>
            <label htmlFor="wallet" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Destination Wallet Address
          </label>
          <input
            id="wallet"
            type="text"
            value={destinationWallet}
              onChange={handleWalletChange}
              className="w-full p-4 text-sm font-mono border-2 rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
              placeholder="Enter Solana wallet address"
            disabled={isSubmitting}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
          />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Enter a valid Solana wallet address to receive the funds
            </p>
        </div>

        {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg">
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {txSignature && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg">
              <p className="font-medium">Transaction Successful!</p>
              <p className="text-sm mt-1 break-all font-mono">{txSignature}</p>
              <p className="text-xs mt-2">Redirecting back to gift page...</p>
          </div>
        )}

          <div className="flex flex-col space-y-3 pt-4">
            <Button 
              onClick={handleWithdraw} 
              disabled={isSubmitting} 
              className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
            {isSubmitting ? "Processing..." : "Withdraw Funds"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => router.push(`/gift/${gift.gift_id}`)}
            disabled={isSubmitting}
              className="w-full py-4 text-lg"
          >
            Cancel
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawPage; 