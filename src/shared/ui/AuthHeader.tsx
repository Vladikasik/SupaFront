"use client";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import LogoutButton from "@/features/auth/components/LogoutButton";

export default function AuthHeader() {
  const { authenticated } = usePrivy();
  
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg text-blue-600">
          SupaGift
        </Link>
        
        {authenticated && (
          <LogoutButton variant="link" size="sm" />
        )}
      </div>
    </header>
  );
} 