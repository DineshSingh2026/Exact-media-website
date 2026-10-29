import { LayoutGrid, Mail, MapPin, Megaphone, Server, TrendingUp, type LucideProps } from "lucide-react";
import type { IconName } from "@/lib/content";

const icons = { Server, Megaphone, LayoutGrid, TrendingUp, MapPin, Mail } satisfies Record<IconName, unknown>;

/** Renders a Lucide icon by the name used in lib/content.ts. Decorative by default. */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden strokeWidth={1.75} {...props} />;
}
