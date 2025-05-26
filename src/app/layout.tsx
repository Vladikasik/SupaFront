import "../globals.css";
import { ReactNode } from "react";
import { PrivyProvider } from "@/shared/lib/PrivyProvider";
import { SenderFlowProvider } from "@/features/sender-flow/context";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PrivyStatusChecker from "@/shared/ui/PrivyStatusChecker";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-[#050505] to-[#6B6B6B] text-white">
        <PrivyProvider>
          <SenderFlowProvider>
            <PrivyStatusChecker />
            <main>
              {children}
            </main>
            <Analytics />
            <SpeedInsights />
          </SenderFlowProvider>
        </PrivyProvider>
      </body>
    </html>
  );
} 