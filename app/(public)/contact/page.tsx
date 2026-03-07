"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import {
  IconCheck,
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSend,
} from "@tabler/icons-react";
import { CONTACT_INFOS } from "@/lib/constants/publicData";

const contactIcons = [IconMail, IconPhone, IconClock, IconMapPin];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <Stack gap={0} bg="#F5F3EB" mih="calc(100vh - 64px)">
      <Box bg="brand.7" py={64}>
        <Container size="lg">
          <Stack align="center" gap="sm">
            <Title order={1} c="white" ta="center">
              Une question ? On est là.
            </Title>
            <Text c="rgba(255,255,255,0.75)" ta="center" maw={580}>
              Réponse sous 24h ouvrées en moyenne. Dites-nous ce dont votre club a besoin.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size="xl" py={48}>
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card radius="xl" padding="lg" withBorder>
              <Stack gap="md">
                <Title order={3} c="brand.7">
                  Envoyer un message
                </Title>

                {sent ? (
                  <Alert icon={<IconCheck size={16} />} color="green" title="Message envoyé">
                    Merci, notre équipe vous répondra rapidement.
                  </Alert>
                ) : null}

                <TextInput label="Nom complet" placeholder="Jean Dupont" required />
                <TextInput label="Nom du club" placeholder="FC Beaumont" />
                <TextInput label="Email" placeholder="jean@club.fr" type="email" required />
                <Select
                  label="Sujet"
                  defaultValue="Question sur les fonctionnalités"
                  data={[
                    "Question sur les fonctionnalités",
                    "Demande de démo",
                    "Facturation",
                    "Support technique",
                    "Autre",
                  ]}
                />
                <Textarea label="Message" minRows={5} required placeholder="Votre message..." />

                <Button
                  leftSection={<IconSend size={16} />}
                  onClick={() => setSent(true)}
                  color="brand"
                >
                  Envoyer
                </Button>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="md">
              <Card radius="xl" padding="lg" withBorder>
                <Stack gap="sm">
                  <Title order={4} c="brand.7">
                    Coordonnées
                  </Title>
                  {CONTACT_INFOS.map((info, index) => {
                    const Icon = contactIcons[index] ?? IconMail;
                    return (
                      <Group key={info.label} gap="sm" align="flex-start">
                        <Icon size={18} color="#04346D" />
                        <Stack gap={0}>
                          <Text fz="sm" c="dimmed">
                            {info.label}
                          </Text>
                          <Text fw={600} c="brand.7">
                            {info.value}
                          </Text>
                        </Stack>
                      </Group>
                    );
                  })}
                </Stack>
              </Card>

              <Card radius="xl" padding="lg" bg="brand.7">
                <Stack gap="sm">
                  <Title order={4} c="white">
                    Besoin d'une démo ?
                  </Title>
                  <Text c="rgba(255,255,255,0.75)">
                    Réservez un créneau de 30 minutes pour voir AutoMaComm en conditions réelles.
                  </Text>
                  <Button variant="white" color="dark">
                    Réserver une démo
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Stack>
  );
}
