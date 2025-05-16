"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import { useSenderFlow } from "@/features/sender-flow/context";

export default function ChooseGiftTypePage() {
  const router = useRouter();
  const { setState } = useSenderFlow();

  const selectType = (type: "token" | "staking" | "nft") => {
    setState((prev) => ({ ...prev, type }));
    if (type === "token") router.push("/sender/checkout");
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-semibold mb-6">Choose Gift Type</h1>
      <Button variant="primary" className="w-full" onClick={() => selectType("token")}>Token (SOL / USDC)</Button>
      <Button variant="inactive" className="w-full" onClick={() => {}}>Staking (COMING SOON)</Button>
      <Button variant="inactive" className="w-full" onClick={() => {}}>NFT (COMING SOON)</Button>
    </div>
  );
} 