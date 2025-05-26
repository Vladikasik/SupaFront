"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchGiftById, updateGiftStatus } from "@/entities/gift/api";
import { Gift } from "@/entities/gift/types";
import { Button } from "@/shared/ui/Button";
import { usePrivy } from "@privy-io/react-auth";
import dynamic from "next/dynamic";

// Use dynamic import with no SSR for the withdraw page component
// This ensures it only loads on the client side
const WithdrawPage = dynamic(() => import("./withdraw").then(mod => mod.WithdrawPage), { 
  ssr: false 
});

export default function GiftClaimPage({ params }: { params: { giftId: string } }) {
  const { giftId } = params;
  const [gift, setGift] = useState<Gift | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const router = useRouter();
  const { login, ready, authenticated, user } = usePrivy();
  
  // Add debug state to store email comparison details
  const [emailDebug, setEmailDebug] = useState<{
    privyEmail: string | null | undefined;
    giftEmail: string | null | undefined;
    match: boolean;
  } | null>(null);

  // First request should fetch gift by gift_id
  useEffect(() => {
    async function loadGift() {
      try {
        setLoading(true);
        console.log("Fetching gift with ID:", giftId);
        const fetchedGift = await fetchGiftById(giftId);
        
        if (fetchedGift) {
          console.log("Gift found:", fetchedGift);
          setGift(fetchedGift);
          
          // If user is authenticated, prepare email debug info
          if (authenticated && user) {
            const privyEmail = user?.email?.address;
            const giftEmail = fetchedGift.receiver_email;
            const match = privyEmail === giftEmail;
            
            console.log("Email comparison:", {
              privyEmail,
              giftEmail,
              match,
            });
            
            setEmailDebug({
              privyEmail,
              giftEmail,
              match,
            });
          }
        } else {
          console.error("Gift not found with ID:", giftId);
          setError("Gift not found. Please check the URL and try again.");
        }
      } catch (err) {
        console.error("Error fetching gift:", err);
        setError(`Failed to load gift: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    }

    if (giftId) {
      loadGift();
    }
  }, [giftId, authenticated, user]);

  // Update email debug whenever user or gift changes
  useEffect(() => {
    if (authenticated && user && gift) {
      const privyEmail = user?.email?.address;
      const giftEmail = gift.receiver_email;
      const match = privyEmail === giftEmail;
      
      console.log("Email comparison updated:", {
        privyEmail,
        giftEmail,
        match,
      });
      
      setEmailDebug({
        privyEmail,
        giftEmail,
        match,
      });
    }
  }, [authenticated, user, gift]);

  if (loading) return <p className="text-center py-10">Loading gift...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!gift) return <p className="text-center py-10">Gift not found</p>;

  // show locked state & login prompt if user is not authenticated yet
  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
        <div className="flex flex-col items-center justify-center w-40 h-40 rounded-full bg-gray-100 dark:bg-gray-800">
          {/* lock icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3" />
            <rect x="4.5" y="10.5" width="15" height="9" rx="2" />
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Gift Locked</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Login with your email to verify ownership and unlock this gift.
          </p>
        </div>
        <Button onClick={() => login()}>Login with Privy</Button>
      </div>
    );
  }

  // Validate email matches
  if (user?.email?.address !== gift.receiver_email) {
    return (
      <div className="max-w-md mx-auto py-10">
        <p className="text-red-600 text-center font-bold text-xl mb-4">Email Mismatch Error</p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-red-800 mb-2">Email Comparison:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Your Privy Email:</span>
              <span className="font-mono bg-white px-2 py-1 rounded">{user?.email?.address || "undefined"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Expected Gift Email:</span>
              <span className="font-mono bg-white px-2 py-1 rounded">{gift.receiver_email || "undefined"}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">
          The email address you&apos;re logged in with doesn&apos;t match the email address associated with this gift.
        </p>
        
        <div className="flex flex-col space-y-3">
          <Button onClick={() => login()} className="w-full">Login with a Different Account</Button>
        </div>
      </div>
    );
  }

  if (showWithdraw && gift) {
    return <WithdrawPage gift={gift} />;
  }

  const claimGift = async () => {
    try {
      await updateGiftStatus(giftId, "claimed");
      alert("Gift claimed! You can now withdraw to your wallet.");
      
      // Reload the gift data after claim
      const updatedGift = await fetchGiftById(giftId);
      if (updatedGift) {
        setGift(updatedGift);
      }
    } catch (e) {
      console.error("Error claiming gift:", e);
      alert((e as Error).message);
    }
  };

  if (gift.status === "pending") {
    return <p className="text-center py-10">Waiting for payment...</p>;
  }

  if (gift.status === "paid" || gift.status === "claimed") {
    const DetailRow = ({ label, value }: { label: string; value: any }) => (
      <div className="flex justify-between py-1 text-sm text-gray-700 dark:text-gray-300">
        <span className="font-medium mr-4">{label}</span>
        <span className="break-all">{String(value ?? "—")}</span>
      </div>
    );

    return (
      <div className="max-w-md mx-auto py-10 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Gift Details</h1>

        {/* Details list */}
        <div className="rounded-lg border p-4 divide-y dark:border-gray-700 dark:divide-gray-700">
          <DetailRow label="Gift ID" value={gift.gift_id} />
          <DetailRow label="Status" value={gift.status} />
          <DetailRow label="Amount" value={gift.amount} />
          <DetailRow label="Token" value={gift.token} />
          <DetailRow label="Sender email" value={gift.sender_email} />
          <DetailRow label="Receiver email" value={gift.receiver_email} />
          <DetailRow label="Privy email" value={user?.email?.address} />
          <DetailRow label="Receiver wallet" value={gift.receiver_wallet} />
          <DetailRow label="Created" value={gift.created_at} />
          <DetailRow label="Claimed" value={gift.claimed} />
          <DetailRow label="Last update" value={gift.last_update} />
          <DetailRow label="Staked" value={gift.is_staked ? "Yes" : "No"} />
          <DetailRow label="Stake end" value={gift.stake_date_end} />
        </div>

        {/* Email verification debug info */}
        <div className="rounded-lg border p-4 bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-800">
          <h2 className="font-medium mb-2">Email Verification</h2>
          <DetailRow label="Privy Login Email" value={user?.email?.address} />
          <DetailRow label="Gift Receiver Email" value={gift.receiver_email} />
          <DetailRow label="Match Status" value={user?.email?.address === gift.receiver_email ? "✅ Match" : "❌ No Match"} />
        </div>

        {/* Action buttons */}
        {gift.status === "paid" && (
          <Button className="w-full" onClick={claimGift}>Claim Gift</Button>
        )}
        {gift.status === "claimed" && (
          <div className="space-y-4">
            <Button className="w-full" variant="primary" onClick={() => setShowWithdraw(true)}>Withdraw to personal wallet</Button>
            <Button className="w-full" variant="inactive">Off-ramp (COMING SOON)</Button>
          </div>
        )}
      </div>
    );
  }

  return <p className="text-center py-10">Gift status: {gift.status}</p>;
} 