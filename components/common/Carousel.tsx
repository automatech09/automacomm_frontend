"use client";

import { useState } from "react";
import { ActionIcon, Box, Group } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface CarouselProps {
  slides: React.ReactNode[];
  showArrows?: boolean;
  showDots?: boolean;
  height?: number | string;
  width?: number | string;
}

export function Carousel({
  slides,
  showArrows = true,
  showDots = true,
  height = "100%",
  width = "100%",
}: CarouselProps) {
  const [index, setIndex] = useState(0);

  if (slides.length === 0) return null;
  if (slides.length === 1) return <Box style={{ height, width, overflow: "hidden" }}>{slides[0]}</Box>;

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const arrowStyle = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
  };

  return (
    <Box style={{ height, width, position: "relative", overflow: "hidden"}}>
      {/* Slides */}
      <Box 
      style={{
        display: "flex",
        height: "100%",
        transform: `translateX(-${index * 100}%)`,
        transition: "transform 240ms ease",
      }}>
        {slides.map((slide, i) => (
          <Box key={i} style={{ flexShrink: 0, width: "100%", height: "100%" }}>
            {slide}
          </Box>
        ))}
      </Box>

      {/* Arrows */}
      {showArrows && (
        <>
          <ActionIcon size="lg" radius="xl" style={{ ...arrowStyle, left: 12 }} onClick={prev}>
            <IconChevronLeft size={16} />
          </ActionIcon>
          <ActionIcon size="lg" radius="xl" style={{ ...arrowStyle, right: 12 }} onClick={next}>
            <IconChevronRight size={16} />
          </ActionIcon>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <Group gap={5} justify="center" style={{ position: "absolute", bottom: 14, left: 0, right: 0 }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 16 : 6,
                height: 6,
                borderRadius: 999,
                background: "white",
                opacity: i === index ? 1 : 0.45,
                cursor: "pointer",
                transition: "all 200ms ease",
                boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            />
          ))}
        </Group>
      )}
    </Box>
  );
}
