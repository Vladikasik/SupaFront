"use client";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "inactive";
}

export const Button = ({
  children,
  className,
  variant = "primary",
  ...rest
}: PropsWithChildren<Props>) => {
  const variantClasses: Record<string, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    inactive: "bg-gray-400 text-white cursor-not-allowed opacity-60",
  };

  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md font-medium transition-colors",
        variantClasses[variant],
        className
      )}
      disabled={variant === "inactive" || rest.disabled}
      {...rest}
    >
      {children}
    </button>
  );
}; 