import { supabase } from "@/shared/lib/supabaseClient";
import { Gift } from "./types";

export async function createGift(data: Partial<Gift>): Promise<Gift | null> {
  const { data: gift, error } = await supabase
    .from("gifts")
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return gift as Gift;
}

export async function fetchGiftById(gift_id: string): Promise<Gift | null> {
  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("gift_id", gift_id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return data as Gift;
}

export async function updateGiftStatus(gift_id: string, status: Gift["status"]): Promise<void> {
  const { error } = await supabase
    .from("gifts")
    .update({ status, last_update: new Date().toISOString() })
    .eq("gift_id", gift_id);
  if (error) throw error;
} 