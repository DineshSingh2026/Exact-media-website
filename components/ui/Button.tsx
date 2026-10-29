import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

const variants: Record<Variant, string> = {
  // Solid accent pill
  primary:
    "bg-accent text-accent-fg shadow-[0_8px_24px_-8px_rgb(var(--accent)/0.6)] hover:bg-accent-hover hover:shadow-[0_10px_28px_-8px_rgb(var(--accent)/0.75)]",
  // For dark surfaces: translucent white pill
  ghost:
    "border border-white/15 bg-white/[0.04] text-ink-fg backdrop-blur-sm hover:border-white/30 hover:bg-white/[0.09]",
  // For light surfaces
  outline: "border border-paper-line bg-paper text-paper-fg hover:border-paper-fg/30 hover:bg-paper-subtle",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();
}

interface ButtonLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant = "primary", size = "md", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
