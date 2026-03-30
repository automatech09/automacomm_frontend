import { Paper, Stack, Text } from "@mantine/core";
import type { DescriptionMock } from "@/lib/mockupdata/descriptions/data";
import type { Team } from "@/types/team";


const EXAMPLE_VALUES: Record<string, Record<string, string>> = {
  Résultat: { "{opponent}": "FC Bordeaux", "{score}": "3-1", "{result_text}": "Victoire", "{result_emoji}": "🏆" },
  Affiche: { "{opponent}": "FC Bordeaux", "{date}": "Sam 15 mars", "{competition}": "Championnat U15", "{time}": "14h30" },
  Classement: { "{position}": "2e", "{points}": "34", "{played}": "18", "{won}": "11", "{lost}": "4" },
};

function fillVariables(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce((str, [k, v]) => str.replaceAll(k, v), template);
}

interface Props {
  mock: DescriptionMock;
  teams: Team[];
  header: string;
  core: string;
  footer: string;
}

export function DescriptionPreview({ mock, teams, header, core, footer }: Props) {
  const teamNames = teams.length > 0 ? teams.map((t) => t.name) : [];
  const extra = EXAMPLE_VALUES[mock.visualType] ?? {};
  const coreText = core.trim()
  const headerText = header.trim()
  const footerText = footer.trim()

  const lines: string[] = [];
  if (headerText) lines.push(headerText);
  teamNames.forEach((name, i) => {
    if (i > 0) lines.push("");
    const values: Record<string, string> = { "{team}": name, ...extra };
    lines.push(fillVariables(coreText, values));
  });
  if (footerText) lines.push("", footerText);

  return (
    <Stack gap={6}>
      <Text fz="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: 0.5 }}>
        Aperçu
      </Text>
      <Paper p="md" radius="lg" style={{ background: "var(--mantine-color-gray-0)", border: "1px solid var(--mantine-color-gray-2)" }}>
        <Text fz="sm" c="dark.6" style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
          {lines.join("\n")}
        </Text>
      </Paper>
      <Text fz="xs" c="dimmed">
        Aperçu avec {teamNames.length} équipe{teamNames.length > 1 ? "s" : ""}
        {teams.length === 0 ? " (exemple)" : ""}
      </Text>
    </Stack>
  );
}
