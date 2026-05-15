import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "primary" | "ghost" | "accent" | "danger" | "link";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  accent: "bg-accent-500 text-white hover:bg-accent-600 rounded-[0.75rem] px-5 py-2.5 font-semibold inline-flex items-center gap-2 cursor-pointer border-none outline-none transition-all hover:-translate-y-0.5 hover:shadow-lg",
  danger: "bg-red-500 text-white hover:bg-red-600 rounded-[0.75rem] px-5 py-2.5 font-semibold inline-flex items-center gap-2 cursor-pointer border-none outline-none transition-all",
  link: "text-[var(--primary)] underline underline-offset-2 bg-transparent border-none outline-none cursor-pointer font-medium",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3",
  icon: "p-2.5 !gap-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(variantStyles[variant], sizeStyles[size], loading && "opacity-70 cursor-not-allowed", className)}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
