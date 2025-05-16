"use client";
import { createContext, useContext, useState, PropsWithChildren } from "react";

interface SenderFlowState {
  amount: number | null;
  type: "token" | "staking" | "nft" | null;
  token: "SOL" | "USDC" | null;
  senderEmail: string | null;
  receiverEmail: string | null;
  receiverWallet: string | null;
  giftId: string | null;
}

const SenderFlowContext = createContext<{
  state: SenderFlowState;
  setState: React.Dispatch<React.SetStateAction<SenderFlowState>>;
} | null>(null);

export function SenderFlowProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<SenderFlowState>({
    amount: null,
    type: null,
    token: null,
    senderEmail: null,
    receiverEmail: null,
    receiverWallet: null,
    giftId: null,
  });

  return (
    <SenderFlowContext.Provider value={{ state, setState }}>
      {children}
    </SenderFlowContext.Provider>
  );
}

export function useSenderFlow() {
  const ctx = useContext(SenderFlowContext);
  if (!ctx) throw new Error("useSenderFlow must be used within SenderFlowProvider");
  return ctx;
} 