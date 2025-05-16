"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";

export default function GiftLookupPage() {
  const [giftId, setGiftId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftId) return;
    router.push(`/gift/${giftId}`);
  };

  return (
    <div className="max-w-md mx-auto py-16 space-y-6">
      <h1 className="text-2xl font-semibold text-center">Find your Gift</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Enter Gift ID"
          value={giftId}
          onChange={(e) => setGiftId(e.target.value)}
        />
        <Button type="submit" className="w-full">Go to Gift</Button>
      </form>
    </div>
  );
} 