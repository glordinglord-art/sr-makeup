import React from "react";
import { cn } from "@/shared/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 cursor-pointer";

    const variants = {
      primary:
        "bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-200 focus:ring-rose-400",
      secondary:
        "bg-stone-900 hover:bg-stone-800 text-white shadow-sm focus:ring-stone-400",
      outline:
        "border border-rose-300 text-rose-700 hover:bg-rose-50 focus:ring-rose-300",
      ghost:
        "text-stone-700 hover:bg-stone-100 hover:text-stone-900 focus:ring-stone-300",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

