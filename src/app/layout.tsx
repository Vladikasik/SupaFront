import "../globals.css";
import { ReactNode } from "react";
import { PrivyProvider } from "@/shared/lib/PrivyProvider";
import { SenderFlowProvider } from "@/features/sender-flow/context";
import AuthHeader from "@/shared/ui/AuthHeader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <PrivyProvider>
          <SenderFlowProvider>
            <AuthHeader />
            <main className="container mx-auto px-4">
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