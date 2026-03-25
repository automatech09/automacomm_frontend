import type { CSSProperties } from "react";
import { Badge } from "@mantine/core";
import { VISUAL_CONFIG } from "../scheduling/CalendarEventCard";
import { VisualType } from "@/types";

interface Props {
  visualTypeName: VisualType;
  size?: string;
  style?: CSSProperties;
}

export function BadgeVisualType({ visualTypeName, size = "md", style }: Props) {
  const badgeColor = VISUAL_CONFIG[visualTypeName].color;
  return (
    <Badge size={size} color={badgeColor} style={style}>
      {visualTypeName}
    </Badge>
  );
}
