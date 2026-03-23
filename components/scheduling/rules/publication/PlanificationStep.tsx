"use client";

import { Group, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";

import { MATCH_OPTIONS } from "@/lib/constants/scheduler";

const TIME_PRESETS = ["08:00", "12:00", "18:00", "20:00"];

interface Props {
  moment: string;
  time: string;
  onMomentChange: (v: string) => void;
  onTimeChange: (v: string) => void;
}

export function PlanificationStep({ moment, time, onMomentChange, onTimeChange }: Props) {
  return (
    <Stack gap="lg">
      <Stack gap={6}>
        <Text fz="xs" c="dimmed">Quand publier par rapport au match</Text>
        <Group gap={4} wrap="wrap">
          {MATCH_OPTIONS.map(({ value, label }) => {
            const selected = moment === value;
            return (
              <UnstyledButton key={value} onClick={() => onMomentChange(value)}>
                <Text
                  fz="xs"
                  fw={500}
                  px={10}
                  py={6}
                  bdrs={10}
                  c={ selected ? "white" : "var(--mantine-color-dark-4)"}
                  bg={selected ? "var(--mantine-color-brand-6)" : "var(--mantine-color-gray-1)"}
                  style={{
                    border: `1.5px solid ${selected ? "var(--mantine-color-brand-6)" : "transparent"}`,
                    transition: "all 120ms",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </Text>
              </UnstyledButton>
            );
          })}
        </Group>
      </Stack>

      <Stack gap={6}>
        <Text fz="xs" c="dimmed">À quelle heure</Text>
        <Group gap={6} align="center">
          {TIME_PRESETS.map((t) => (
            <UnstyledButton key={t} onClick={() => onTimeChange(t)}>
              <Text
                fz="xs"
                fw={500}
                px={12}
                py={6}
                style={{
                  borderRadius: 10,
                  background: time === t ? "var(--mantine-color-brand-6)" : "var(--mantine-color-gray-1)",
                  color: time === t ? "white" : "var(--mantine-color-dark-4)",
                  border: `1.5px solid ${time === t ? "var(--mantine-color-brand-6)" : "transparent"}`,
                  transition: "all 120ms",
                }}
              >
                {t}
              </Text>
            </UnstyledButton>
          ))}
          <TextInput
            type="time"
            value={time}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTimeChange(e.target.value)}
            radius="lg"
            size="xs"
            style={{ width: 110 }}
          />
        </Group>
      </Stack>
    </Stack>
  );
}
