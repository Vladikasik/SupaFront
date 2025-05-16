"use client";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/shared/ui/Button";
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface LogoutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link";
  size?: "sm" | "md" | "lg";
}

export default function LogoutButton({ 
  variant = "secondary", 
  size = "md",
  className,
  ...rest 
}: LogoutButtonProps) {
  const { logout } = usePrivy();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const sizeClasses = {
    sm: "text-xs py-1 px-2",
    md: "text-sm py-2 px-4",
    lg: "text-base py-3 px-6",
  };

  // If variant is "link", override button styling
  if (variant === "link") {
    return (
      <button
        onClick={handleLogout}
        className={clsx(
          "text-gray-600 hover:text-gray-900 underline text-sm font-medium",
          className
        )}
        {...rest}
      >
        Sign Out
      </button>
    );
  }

  return (
    <Button
      variant={variant}
      className={clsx(sizeClasses[size], className)}
      onClick={handleLogout}
      {...rest}
    >
      Sign Out
    </Button>
  );
} 