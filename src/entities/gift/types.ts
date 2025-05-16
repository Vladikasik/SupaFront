export type GiftStatus = "pending" | "paid" | "claimed" | "withdrawn";

export interface Gift {
  created_at: string;
  gift_id: string;
  sender_email: string | null;
  receiver_email: string | null;
  receiver_privy_: string | null;
  token: string | null;
  amount: number | null;
  status: GiftStatus;
  receiver_wallet: string | null;
  claimed: string | null;
  last_update: string | null;
  is_staked: boolean | null;
  stake_date_end: string | null;
} 