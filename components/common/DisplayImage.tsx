"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Image, ImageProps, Loader } from "@mantine/core";

interface DisplayImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  src: string;
  alt?: string;
}

export function DisplayImage({ src, style, ...props }: DisplayImageProps) {
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoading(false);
  }, [src]);

  return (
    <>
      {loading && (
        <Box style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loader size="sm" color="brand" />
        </Box>
      )}

      <Image
        ref={imgRef}
        src={src}
        fallbackSrc="/globe.svg"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.3s ease", ...style }}
        {...props}
      />
    </>
  );
}
