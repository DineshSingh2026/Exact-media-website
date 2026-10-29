import type { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  /** Adds hover lift, accent border and shadow. Pair with `group` children for image zoom. */
  interactive?: boolean;
}

export function Card({ interactive = false, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-paper-line bg-paper ${
        interactive
          ? "group transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-lift motion-reduce:hover:translate-y-0"
          : ""
      } ${className}`}
      {...props}
    />
  );
}
