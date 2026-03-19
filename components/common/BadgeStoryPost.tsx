import { TemplateFormat } from "@/types";
import { Badge } from "@mantine/core";


export function BadgeStoryOrPost({ format, size = "md" }: { format: TemplateFormat; size?: string }) {
  return (
    <Badge variant="light" size={size} color="brand">
      {format === "Story" ? "S" : "P"}
    </Badge>
  );
}