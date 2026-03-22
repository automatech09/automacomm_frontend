import { forwardRef } from "react";
import { Stack, Text, Textarea } from "@mantine/core";

interface Props {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  placeholder?: string;
  minRows?: number;
}

export const DescriptionBlock = forwardRef<HTMLTextAreaElement, Props>(
  function DescriptionBlock({ label, hint, value, onChange, onFocus, placeholder, minRows = 2 }, ref) {
    return (
      <Stack gap={4}>
        <Stack gap={2}>
          <Text fz="sm" fw={600} c="dark.6">{label}</Text>
          {hint && <Text fz="xs" c="dimmed">{hint}</Text>}
        </Stack>
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          autosize
          minRows={minRows}
          radius="lg"
        />
      </Stack>
    );
  }
);
