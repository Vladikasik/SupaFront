"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useSenderFlow } from "@/features/sender-flow/context";

const schema = z.object({
  amount: z
    .number({ required_error: "Amount is required" })
    .positive("Amount must be positive")
    .max(10000, "Max $10,000"),
});

type FormValues = z.infer<typeof schema>;

export default function ChooseAmountPage() {
  const { setState } = useSenderFlow();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    setState((prev) => ({ ...prev, amount: data.amount }));
    router.push("/sender/type");
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Choose Gift Amount (USD)</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="number"
            step="0.01"
            placeholder="Enter amount in USD"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
} 