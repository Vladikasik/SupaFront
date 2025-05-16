import { supabase } from "@/shared/lib/supabaseClient";

export async function upsertUser(email: string, wallet: string): Promise<void> {
  const { error } = await supabase
    .from("users")
    .upsert({ email, wallet }, { onConflict: "email" });
  if (error) throw error;
} 