"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <h1 className="text-4xl font-bold">Breakout Gift</h1>
      <p className="text-gray-700 max-w-md text-center">
        Send crypto gifts easily in USD. Create a gift, share the link, and let your friends claim on Solana.
      </p>
      <Button className="px-8 py-3 text-lg" onClick={() => router.push("/sender/amount")}>Create New Gift</Button>
      <Button variant="secondary" onClick={() => router.push("/dev")}>Dev Tools</Button>
    </div>
  );
} 