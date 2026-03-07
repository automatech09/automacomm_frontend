import { Team } from "@/types";
import { Badge } from "@mantine/core";

export function BadgeTeam({ teamData }: { teamData: Team }) {
  return (
    <Badge radius="sm" variant="light" bg="white" style={{ borderLeft: `3px solid ${teamData.color}`, boxShadow: "0 2px 6px rgba(4,52,109,0.12)" }}>
      {teamData.name}
    </Badge>
  );
}