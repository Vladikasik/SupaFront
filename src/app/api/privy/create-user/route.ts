import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required and must be a string" }, { status: 400 });
    }

    // Get Privy credentials
    const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
    const apiKey = process.env.PRIVY_APP_SECRET;

    // Validate credentials
    if (!appId || !apiKey) {
      console.error("Missing Privy credentials:", { appId: !!appId, apiKey: !!apiKey });
      return NextResponse.json({ 
        error: "Privy credentials missing. Please add NEXT_PUBLIC_PRIVY_APP_ID and PRIVY_APP_SECRET to your .env.local file" 
      }, { status: 500 });
    }

    console.log(`Creating Privy user for email: ${email}`);

    // Make request to Privy API
    const privyRes = await fetch("https://auth.privy.io/api/v1/users", {
      method: "POST",
      headers: {
        "privy-app-id": appId,
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${appId}:${apiKey}`).toString("base64")}`,
      },
      body: JSON.stringify({
        create_solana_wallet: true,
        linked_accounts: [
          {
            address: email,
            type: "email",
          },
        ],
      }),
    });

    // Handle failed request
    if (!privyRes.ok) {
      const errorText = await privyRes.text();
      console.error("Privy API error:", privyRes.status, errorText);
      return NextResponse.json({ 
        error: `Privy API failed with status ${privyRes.status}: ${errorText}` 
      }, { status: privyRes.status });
    }

    // Parse response
    const data = await privyRes.json();
    console.log("Privy API response received:", data?.user_id ? "User created/found" : "Unknown response");

    // Extract Solana wallet address from response structure
    let walletAddress: string | undefined;

    // New Privy response format: wallets array may not exist; use linked_accounts
    if (Array.isArray(data.wallets)) {
      const solWal = data.wallets.find((w: any) => w.chain === "solana" || w.blockchain === "solana");
      walletAddress = solWal?.address || solWal?.public_key;
      console.log("Found wallet in wallets array:", !!walletAddress);
    }

    if (!walletAddress && Array.isArray(data.linked_accounts)) {
      const solAccount = data.linked_accounts.find(
        (acc: any) => acc.type === "wallet" && (acc.chain_type === "solana" || acc.walletClient === "privy")
      );
      walletAddress = solAccount?.address;
      console.log("Found wallet in linked_accounts:", !!walletAddress);
    }

    if (!walletAddress) {
      console.error("No Solana wallet found in Privy response:", data);
      return NextResponse.json({ error: "No Solana wallet returned by Privy" }, { status: 500 });
    }

    // Return success with wallet address
    return NextResponse.json({ walletAddress });
    
  } catch (error) {
    console.error("Unexpected error in create-user:", error);
    return NextResponse.json({ 
      error: `Unexpected error: ${(error as Error).message}` 
    }, { status: 500 });
  }
} 