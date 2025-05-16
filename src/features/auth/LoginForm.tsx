"use client";
import { useState } from "react";
import { useLoginWithEmail } from "@privy-io/react-auth";
import { Button } from "@/shared/ui/Button";
import clsx from "clsx";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) return;
    try {
      setLoading(true);
      await sendCode({ email });
      setStep("code");
      setLoading(false);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleLogin = async () => {
    if (!code) return;
    try {
      setLoading(true);
      await loginWithCode({ code });
      setLoading(false);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold">Login</h1>

      {step === "email" && (
        <div className="w-full space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleSendCode}
            disabled={!email || loading}
          >
            {loading ? "Sending..." : "Send Code"}
          </Button>
        </div>
      )}

      {step === "code" && (
        <div className="w-full space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border rounded-md p-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={!code || loading}
          >
            {loading ? "Logging in..." : "Verify & Login"}
          </Button>
          <button
            className={clsx("text-sm underline text-gray-600 hover:text-gray-800")}
            onClick={() => setStep("email")}
          >
            Change email
          </button>
        </div>
      )}
    </div>
  );
} 