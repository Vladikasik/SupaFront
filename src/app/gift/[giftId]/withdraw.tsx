"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import { Gift } from "@/entities/gift/types";
import { usePrivy } from "@privy-io/react-auth";
import { useSendTransaction } from "@privy-io/react-auth/solana";
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
  const { user, ready, authenticated } = usePrivy();
  const { sendTransaction } = useSendTransaction();

  const handleWithdraw = async () => {
    if (!destinationWallet) {
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
      destPubkey = new web3.PublicKey(destinationWallet);
    } catch (e) {
      setError("Invalid Solana address");
      return;
    }

    if (!ready || !authenticated) {
      setError("Wallet not ready. Please ensure you're logged in.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const network: web3.Cluster = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as web3.Cluster) || "devnet";
      const connection = new web3.Connection(web3.clusterApiUrl(network), "confirmed");

      const senderAddress = user?.wallet?.address;
      if (!senderAddress) {
        setError("Sender wallet not found");
        setIsSubmitting(false);
        return;
      }

      console.log("[Withdraw] Building transaction...");

      const lamports = Math.round(parseFloat(amount) * web3.LAMPORTS_PER_SOL);

      const transaction = new web3.Transaction();
      transaction.add(
        web3.SystemProgram.transfer({
          fromPubkey: new web3.PublicKey(senderAddress),
          toPubkey: destPubkey,
          lamports,
        })
      );

      // Recent blockhash & fee payer handled by Privy hook internally; still good to set
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new web3.PublicKey(senderAddress);

      console.log("[Withdraw] Sending transaction via Privy ...");

      const receipt = await sendTransaction({ transaction, connection });

      console.log("[Withdraw] Transaction sent! Signature:", receipt.signature);
      setTxSignature(receipt.signature);

      alert(`Success! Funds transferred. Tx: ${receipt.signature}`);
      router.push(`/gift/${gift.gift_id}`);
    } catch (err: any) {
      console.error("[Withdraw] Error:", err);
      setError(err.message || "Failed to send transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Withdraw Funds</h1>

      <div className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Amount (SOL)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            placeholder="0.00"
            disabled={isSubmitting}
            min="0"
            step="0.000001"
          />
        </div>

        <div>
          <label htmlFor="wallet" className="block text-sm font-medium mb-1">
            Destination Wallet Address
          </label>
          <input
            id="wallet"
            type="text"
            value={destinationWallet}
            onChange={(e) => setDestinationWallet(e.target.value)}
            className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            placeholder="Solana wallet address"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {txSignature && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md break-all">
            Transaction successful! Signature: {txSignature}
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <Button onClick={handleWithdraw} disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Processing..." : "Withdraw Funds"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => router.push(`/gift/${gift.gift_id}`)}
            disabled={isSubmitting}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawPage; 