import "../globals.css";
import { ReactNode } from "react";
import { PrivyProvider } from "@/shared/lib/PrivyProvider";
import { SenderFlowProvider } from "@/features/sender-flow/context";
import AuthHeader from "@/shared/ui/AuthHeader";

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
          </SenderFlowProvider>
        </PrivyProvider>
      </body>
    </html>
  );
} 