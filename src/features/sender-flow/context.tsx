"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type SenderFlowState = {
  amount?: number;
  amountUsd?: number;
  token?: string;
  type?: "token" | "staking" | "nft";
  senderEmail?: string;
  receiverEmail?: string;
  receiverWallet?: string;
  giftId?: string;
};

type SenderFlowContextType = {
  state: SenderFlowState;
  setState: React.Dispatch<React.SetStateAction<SenderFlowState>>;
};

const SenderFlowContext = createContext<SenderFlowContextType | undefined>(
  undefined,
);

export function SenderFlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SenderFlowState>({});

  return (
    <SenderFlowContext.Provider value={{ state, setState }}>
      {children}
    </SenderFlowContext.Provider>
  );
}

export function useSenderFlow() {
  const context = useContext(SenderFlowContext);
  if (context === undefined) {
    throw new Error("useSenderFlow must be used within a SenderFlowProvider");
  }
  return context;
}
