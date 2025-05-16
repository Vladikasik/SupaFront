"use client";
import { PrivyProvider as BasePrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { PropsWithChildren } from "react";

const appId =
  process.env.NEXT_PUBLIC_PRIVY_APP_ID ||
  (process.env as any).privy_app_id ||
  "";

export function PrivyProvider({ children }: PropsWithChildren) {
  if (!appId) {
    // Show helpful message in any environment instead of silently omitting the provider
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center space-y-4">
        <h1 className="text-xl font-semibold text-red-600">Privy App ID Missing</h1>
        <p className="max-w-md text-gray-700 dark:text-gray-300">
          Set the <code>NEXT_PUBLIC_PRIVY_APP_ID</code> environment variable (from the Privy
          dashboard) and restart the dev server.
        </p>
      </div>
    );
  }

  return (
    <BasePrivyProvider
      appId={appId}
      config={{
        loginMethods: ["email"],
        appearance: {
          walletChainType: "solana-only",
        },
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors(),
          },
        },
      }}
    >
      {children}
    </BasePrivyProvider>
  );
} 