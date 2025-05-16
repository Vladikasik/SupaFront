"use client";
export const dynamic = 'force-dynamic';
import { useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import { useEffect, useState } from "react";
import { fetchGiftById } from "@/entities/gift/api";
import { Gift } from "@/entities/gift/types";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const giftId = params.get("giftId");
  const [gift, setGift] = useState<Gift | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (!giftId) {
      setError("No gift ID found in URL");
      setLoading(false);
      return;
    }
    
    async function loadGift() {
      try {
        setLoading(true);
        console.log("Fetching gift details after payment:", giftId);
        const fetchedGift = await fetchGiftById(giftId!);
        
        if (fetchedGift) {
          console.log("Gift details:", fetchedGift);
          setGift(fetchedGift);
        } else {
          console.error("Gift not found with ID:", giftId);
          setError("Gift not found. Please check the URL and try again.");
        }
      } catch (err) {
        console.error("Error fetching gift details:", err);
        setError(`Failed to load gift: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    }

    loadGift();
  }, [giftId]);
  
  const handleCopyLink = async () => {
    if (!giftId) return;
    
    const giftLink = `${window.location.origin}/gift/${giftId}`;
    try {
      await navigator.clipboard.writeText(giftLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <h1 className="text-2xl font-semibold">Loading gift details...</h1>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4">
        <h1 className="text-2xl font-semibold text-red-600">Error</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  
  const giftLink = giftId ? `${window.location.origin}/gift/${giftId}` : "";
  
  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold">Payment Successful!</h1>
        <p className="text-gray-700">
          Gift created successfully and ready to be shared.
        </p>
      </div>

      {/* Gift summary */}
      {gift && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h2 className="font-medium">Gift Details</h2>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">{gift.amount} {gift.token}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                  gift.status === 'paid' ? 'bg-green-500' : 
                  gift.status === 'pending' ? 'bg-yellow-500' : 
                  'bg-gray-500'
                }`}></span>
                {gift.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Recipient:</span>
              <span className="font-medium">{gift.receiver_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Created:</span>
              <span className="font-medium">{new Date(gift.created_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gift ID:</span>
              <span className="font-mono text-xs">{gift.gift_id}</span>
            </div>
          </div>
        </div>
      )}

      {/* Link section */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h2 className="font-medium">Share with Recipient</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-3">
            Send this link to the gift recipient:
          </p>
          <div className="bg-gray-100 px-3 py-3 rounded-md text-center break-all text-sm font-mono">
            {giftLink}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <Button onClick={handleCopyLink} className="w-full">
          {copied ? "✓ Copied!" : "Copy Gift Link"}
        </Button>
        <Button variant="secondary" onClick={() => window.location.href = "/"} className="w-full">
          Return Home
        </Button>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-6">
        <p>The recipient will need to log in with their email to claim this gift.</p>
      </div>
    </div>
  );
} 