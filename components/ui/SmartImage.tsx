import Image from "next/image";
import type { ImageAsset } from "@/lib/content";
import { imageExists } from "@/lib/images";

interface SmartImageProps {
  image: ImageAsset;
  className?: string;
  /** Classes for the wrapper (controls rounding, borders, aspect etc.) */
  wrapperClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Fill the parent instead of using intrinsic aspect ratio (parent must be relative) */
  fill?: boolean;
}

/**
 * Server component: renders next/image when the file exists in /public,
 * otherwise a dark-to-accent gradient placeholder at the same aspect ratio.
 */
export function SmartImage({ image, className = "", wrapperClassName = "", priority, sizes, fill }: SmartImageProps) {
  const exists = imageExists(image.src);
  const ratio = { aspectRatio: `${image.width} / ${image.height}` };

  if (!exists) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`overflow-hidden ${fill ? "absolute inset-0" : "relative w-full"} ${wrapperClassName}`}
        style={fill ? undefined : ratio}
      >
        <div
          className={`absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_10%,rgb(var(--accent)/0.85)_0%,rgb(var(--accent)/0.25)_35%,transparent_65%),radial-gradient(80%_80%_at_10%_100%,rgb(var(--accent-glow)/0.35)_0%,transparent_60%),linear-gradient(160deg,rgb(var(--ink-raised))_0%,rgb(var(--ink))_100%)] ${className}`}
        />
        {/* Subtle grid texture so the placeholder still feels designed */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgb(255_255_255/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.6)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`relative w-full overflow-hidden ${wrapperClassName}`} style={ratio}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className={`h-full w-full object-cover ${className}`}
      />
    </div>
  );
}
