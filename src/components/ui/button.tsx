import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variantClasses = {
  primary:
    "bg-[var(--ink)] text-white shadow-sm hover:bg-[#152130] focus-visible:outline-[#152130]",
  secondary:
    "border border-[var(--ink)]/20 bg-white text-[var(--ink)] hover:bg-[#f3eee4] focus-visible:outline-[var(--ink)]/40",
  ghost:
    "border border-transparent bg-transparent text-[var(--slate)] hover:bg-[var(--sand)] hover:text-[var(--ink)] focus-visible:outline-[var(--ink)]/30",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantClasses;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

export function buttonStyles(
  variant: keyof typeof variantClasses = "primary",
  additional?: string,
) {
  return cn(baseClasses, variantClasses[variant], additional);
}

