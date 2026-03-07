"use client";

import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  List,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Accordion,
} from "@mantine/core";
import { IconArrowRight, IconCheck, IconStars } from "@tabler/icons-react";
import { PUBLIC_FAQS, PUBLIC_PLANS } from "@/lib/constants/publicData";

export default function PricingPage() {
  return (
    <Stack gap={0} bg="#F5F3EB">
      <Box bg="brand.7" py={72}>
        <Container size="lg">
          <Stack align="center" gap="md">
            <Badge variant="light" color="gray" c="white">
              Tarifs
            </Badge>
            <Title order={1} c="white" ta="center">
              Simple, transparent, sans surprise
            </Title>
            <Text c="rgba(255,255,255,0.75)" ta="center" maw={620}>
              14 jours d'essai gratuit sur tous les plans. Sans carte bancaire et sans engagement.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size="xl" py={56}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {PUBLIC_PLANS.map((plan) => (
            <Card
              key={plan.name}
              padding="lg"
              radius="xl"
              withBorder
              bg={plan.popular ? "brand.7" : "white"}
              style={{ borderColor: plan.popular ? "#04346D" : "rgba(4,52,109,0.12)" }}
            >
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Title order={3} c={plan.popular ? "white" : "brand.7"}>
                    {plan.name}
                  </Title>
                  {plan.popular ? (
                    <Badge color="orange" leftSection={<IconStars size={12} />}>
                      Populaire
                    </Badge>
                  ) : null}
                </Group>

                <Text c={plan.popular ? "rgba(255,255,255,0.75)" : "dimmed"}>{plan.description}</Text>

                <Group gap={4} align="flex-end">
                  <Text fz={44} fw={800} c={plan.popular ? "white" : "brand.7"} lh={1}>
                    {plan.price}€
                  </Text>
                  <Text c={plan.popular ? "rgba(255,255,255,0.65)" : "dimmed"}>{plan.period}</Text>
                </Group>

                <List
                  spacing="xs"
                  icon={
                    <ThemeIcon
                      size={20}
                      radius="xl"
                      variant="light"
                      color={plan.popular ? "orange" : "brand"}
                    >
                      <IconCheck size={14} />
                    </ThemeIcon>
                  }
                >
                  {plan.features.map((feature) => (
                    <List.Item key={feature}>
                      <Text c={plan.popular ? "rgba(255,255,255,0.88)" : "rgba(4,52,109,0.8)"} fz="sm">
                        {feature}
                      </Text>
                    </List.Item>
                  ))}
                </List>

                <Button
                  component={Link}
                  href={plan.name === "Club" ? "/contact" : "/register"}
                  color={plan.popular ? "orange" : "brand"}
                  rightSection={<IconArrowRight size={16} />}
                  fullWidth
                >
                  {plan.cta}
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      <Box bg="white" py={56}>
        <Container size="md">
          <Stack gap="lg">
            <Title order={2} ta="center" c="brand.7">
              Questions fréquentes
            </Title>
            <Accordion variant="separated" radius="lg">
              {PUBLIC_FAQS.map((faq) => (
                <Accordion.Item value={faq.question} key={faq.question}>
                  <Accordion.Control>{faq.question}</Accordion.Control>
                  <Accordion.Panel>
                    <Text c="dimmed">{faq.answer}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
}
