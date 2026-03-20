"use client";

import { useMediaQuery } from "@mantine/hooks";

/** Retourne true si la largeur d'écran est inférieure au breakpoint sm (768px) */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)") ?? false;
}
