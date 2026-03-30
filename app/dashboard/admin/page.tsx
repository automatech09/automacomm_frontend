import { Stack, Text, Title } from "@mantine/core";
import { AdminTemplateStudio } from "@/components/admin/AdminTemplateStudio";

export default function DashboardAdminPage() {
  return (
    <Stack gap="lg">
      <Stack gap={2}>
        <Title order={1} c="brand.7" fz="1.6rem">
          Admin Templates
        </Title>
        <Text fz="sm" c="rgba(4,52,109,0.55)">
          TP Fabric.js integre dans l&apos;admin du projet avec creation, sauvegarde JSON locale et liste des templates existants.
        </Text>
      </Stack>

      <AdminTemplateStudio />
    </Stack>
  );
}
