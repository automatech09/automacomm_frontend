import { TemplateFormat } from "@/types";
import { Badge } from "@mantine/core";

export function BadgeStoryOrPost({ format }: { format: TemplateFormat }) {
  return (
    <Badge variant="light" color="brand">
                    {format === "Story" ? "S" : "P"}
    </Badge>
  );
}