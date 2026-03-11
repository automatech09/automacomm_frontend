"use client";

import { useState } from "react";
import { Stack, Group, Text, Paper, TextInput, Select, Button, SimpleGrid } from "@mantine/core";
import { IconBuilding, IconCircleCheck } from "@tabler/icons-react";
import { ableSports } from "@/lib/constants/sports";

const inputStyles = {
  input: { background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D", borderRadius: 12 },
  label: { color: "rgba(4,52,109,0.6)", fontWeight: 500 },
};

export function ClubSection() {
  const [form, setForm] = useState({
    name: "FC Beaumont", city: "Beaumont", postalCode: "63110",
    website: "www.fcbeaumont.fr", sport: "Football", email: "contact@fcbeaumont.fr",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Paper radius="xl" p="xl" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
      <Stack gap="md">
        <Stack gap={2}>
          <Text fw={700} style={{ color: "#04346D" }}>Informations du club</Text>
          <Text fz="xs" style={{ color: "rgba(4,52,109,0.5)" }}>Nom, localisation et coordonnées de contact</Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <TextInput label="Nom du club" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} styles={inputStyles} />
          <Select
            label="Sport" value={form.sport}
            onChange={(v) => setForm({ ...form, sport: v ?? form.sport })}
            data={ableSports}
            styles={inputStyles}
          />
          <TextInput label="Ville" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} styles={inputStyles} />
          <TextInput label="Code postal" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} styles={inputStyles} />
          <TextInput label="Email de contact" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} styles={inputStyles} />
          <TextInput label="Site web (optionnel)" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} styles={inputStyles} />
        </SimpleGrid>

        <Group>
          <Button
            onClick={handleSave}
            leftSection={saved ? <IconCircleCheck size={15} /> : <IconBuilding size={15} />}
            style={{ background: "#04346D", borderRadius: 10, fontWeight: 600 }}
          >
            {saved ? "Enregistré !" : "Sauvegarder"}
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
