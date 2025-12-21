import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variantClasses = {
  primary:
    "bg-[var(--light-silver)] text-[var(--black)] shadow-sm hover:bg-[var(--silver)] focus-visible:outline-[var(--silver)]",
  secondary:
    "border border-[var(--silver)]/30 bg-[var(--charcoal)] text-[var(--light-silver)] hover:bg-[var(--dark-gray)] focus-visible:outline-[var(--silver)]/40",
  ghost:
    "border border-transparent bg-transparent text-[var(--silver)] hover:bg-[var(--dark-gray)] hover:text-[var(--light-silver)] focus-visible:outline-[var(--silver)]/30",
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

