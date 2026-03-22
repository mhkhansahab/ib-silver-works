import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseClasses =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 font-sans";

const variantClasses = {
  primary:
    "border border-ink bg-ink text-ivory hover:bg-transparent hover:text-ink focus-visible:outline-ink",
  secondary:
    "border border-ink/30 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-ivory focus-visible:outline-ink/40",
  ghost:
    "border border-transparent bg-transparent text-pewter hover:text-ink focus-visible:outline-pewter/30",
  gold: "border border-gold bg-transparent text-gold hover:bg-gold hover:text-dark focus-visible:outline-gold",
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
