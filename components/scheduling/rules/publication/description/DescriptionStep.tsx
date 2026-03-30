"use client";

import { useRef, useState } from "react";
import { Button, Divider, Group, Stack, Text } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { DESCRIPTION_MOCKS } from "@/lib/mockupdata/descriptions/data";
import type { VisualType } from "@/types/template";
import type { Team } from "@/types/team";
import { DescriptionBlock } from "./DescriptionBlock";
import { VariablePicker } from "./VariablePicker";
import { DescriptionPreview } from "./DescriptionPreview";


type FocusedField = "header" | "core" | "footer";

interface Props {
  visualType: VisualType | null;
  teams: Team[];
  header: string;
  core: string;
  footer: string;
  onChange: (field: "header" | "core" | "footer", value: string) => void;
}

export function DescriptionStep({ visualType, teams, header, core, footer, onChange }: Props) {
  const [focused, setFocused] = useState<FocusedField>("core");

  const isCarousel = teams.length > 1;

  const hintBlockCore = isCarousel ? "Répété pour chaque équipe — utilisez les variables ci-dessous" : "Utilisez les varibles ci-dessous"

  const headerRef = useRef<HTMLTextAreaElement>(null);
  const coreRef = useRef<HTMLTextAreaElement>(null);
  const footerRef = useRef<HTMLTextAreaElement>(null);

  const refs: Record<FocusedField, React.RefObject<HTMLTextAreaElement | null>> = {
    header: headerRef,
    core: coreRef,
    footer: footerRef,
  };

  
  const mock = DESCRIPTION_MOCKS.find((m) => m.visualType === visualType);

  function insertVariable(variable: string) {
    const el = refs[focused].current;
    if (!el) return;

    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const current = focused === "header" ? header : focused === "core" ? core : footer;
    const next = current.slice(0, start) + variable + current.slice(end);
    onChange(focused, next);

    requestAnimationFrame(() => {
      el.focus();
      const pos = start + variable.length;
      el.setSelectionRange(pos, pos);
    });
  }

  function fillWithExample() {
    if (!mock) return;
    onChange("header", mock.example.header ?? "");
    onChange("core", mock.example.core);
    onChange("footer", mock.example.footer ?? "");
  }

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Stack gap={2}>
          <Text fz="sm" fw={600} c="dark.6">Description de la publication</Text>
          {isCarousel && (
          <Text fz="xs" c="dimmed">
            Le corps sera répété automatiquement pour chaque équipe concernée.
          </Text>
          )}
        </Stack>
        {mock && (
          <Button
            variant="light"
            color="brand"
            size="xs"
            radius="xl"
            leftSection={<IconSparkles size={13} />}
            onClick={fillWithExample}
          >
            Remplir avec un exemple
          </Button>
        )}
      </Group>
      <Group align="flex-start" gap="lg" wrap="nowrap">
        <Stack gap="sm" style={{ flex: 1 }}>
          <DescriptionBlock
            ref={headerRef}
            label="Introduction"
            hint="Optionnel — s'affiche avant le corps du message"
            value={header}
            onChange={(v) => onChange("header", v)}
            onFocus={() => setFocused("header")}
            placeholder={mock?.example.header ?? "Ex : Résultats du week-end 🔥"}
          />
          <DescriptionBlock
            ref={coreRef}
            label="Corps du message"
            hint={hintBlockCore}
            value={core}
            onChange={(v) => onChange("core", v)}
            onFocus={() => setFocused("core")}
            placeholder={mock?.example.core ?? "Ex : {result_text} de {team} face à {opponent}"}
            minRows={3}
          />
          <DescriptionBlock
            ref={footerRef}
            label="Conclusion"
            hint="Optionnel — s'affiche après le corps du message"
            value={footer}
            onChange={(v) => onChange("footer", v)}
            onFocus={() => setFocused("footer")}
            placeholder={mock?.example.footer ?? "Ex : Bravo à toutes les équipes 👏"}
          />

          {mock && (
            <>
              <Divider />
              <VariablePicker variables={mock.availableVariables} onInsert={insertVariable} />
            </>
          )}
        </Stack>

        {mock && (
          <Stack gap="sm" style={{ flex: 1 }}>
            <DescriptionPreview mock={mock} teams={teams} header={header} core={core} footer={footer} />
          </Stack>
        )}
      </Group>
    </Stack>
  );
}
