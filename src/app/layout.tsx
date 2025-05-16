import "../globals.css";
import { ReactNode } from "react";
import { PrivyProvider } from "@/shared/lib/PrivyProvider";
import { SenderFlowProvider } from "@/features/sender-flow/context";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <PrivyProvider>
          <SenderFlowProvider>{children}</SenderFlowProvider>
        </PrivyProvider>
      </body>
    </html>
  );
} 