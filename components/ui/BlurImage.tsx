"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface BlurImageProps extends Omit<ImageProps, "onLoad"> {
  /** Optional pre-generated blur data URL (from getBlurDataUrl). When provided, used as placeholder until image loads. */
  blurDataURL?: string;
  /** Callback when image has finished loading (for fade-in). */
  onLoadingComplete?: () => void;
}

export function BlurImage({
  src,
  alt,
  blurDataURL,
  className,
  onLoadingComplete,
  ...props
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoadingComplete?.();
  };

  return (
    <Image
      src={src}
      alt={alt}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      onLoad={handleLoad}
      className={cn(
        "duration-700 ease-out transition-[transform,filter]",
        isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
        className
      )}
      {...props}
    />
  );
}
