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

  return (
    <Box style={{ height, width, position: "relative", overflow: "hidden" }}>
      {/* Slides */}
      <Box
        style={{
          display: "flex",
          height: "100%",
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 220ms ease",
        }}
      >
        {slides.map((slide, i) => (
          <Box key={i} style={{ flexShrink: 0, width: "100%", height: "100%" }}>
            {slide}
          </Box>
        ))}
      </Box>

      {/* Arrows */}
      {showArrows && (
        <>
          <ActionIcon
            variant="white"
            size="sm"
            radius="xl"
            style={{ position: "absolute", left: 4, top: "50%", transform: "translateY(-50%)", opacity: 0.85 }}
            onClick={prev}
          >
            <IconChevronLeft size={12} />
          </ActionIcon>
          <ActionIcon
            variant="white"
            size="sm"
            radius="xl"
            style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", opacity: 0.85 }}
            onClick={next}
          >
            <IconChevronRight size={12} />
          </ActionIcon>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <Group gap={4} justify="center" style={{ position: "absolute", bottom: 4, left: 0, right: 0 }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 12 : 5,
                height: 5,
                borderRadius: 999,
                backgroundColor: "white",
                opacity: i === index ? 1 : 0.5,
                cursor: "pointer",
                transition: "all 180ms ease",
              }}
            />
          ))}
        </Group>
      )}
    </Box>
  );
}
