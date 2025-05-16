import { encodeURL } from "@solana/pay";
import BigNumber from "bignumber.js";
import { Keypair, PublicKey } from "@solana/web3.js";

export interface PaymentParams {
  recipient: string;
  amount: number | string | BigNumber;
  reference: PublicKey;
  label?: string;
  message?: string;
  memo?: string;
}

export function generateSolanaPayUrl(params: PaymentParams): URL {
  const { recipient, amount, reference, label, message, memo } = params;

  const amountBN = BigNumber.isBigNumber(amount)
    ? (amount as BigNumber)
    : new BigNumber(amount);

  const url = encodeURL({
    recipient: new PublicKey(recipient),
    amount: amountBN,
    reference,
    label,
    message,
    memo,
  });

  return url;
}

export function generateReference(): PublicKey {
  return Keypair.generate().publicKey;
} 