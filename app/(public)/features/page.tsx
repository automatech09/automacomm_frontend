import Link from "next/link";
import {
  IconArrowRight,
  IconBolt,
  IconBrandFacebook,
  IconBrandInstagram,
  IconCalendar,
  IconCheck,
  IconClock,
  IconPhoto,
  IconStar,
  IconTrophy,
} from "@tabler/icons-react";
import {
  Badge,
  Box,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

const stats = [
  { value: "500+", label: "Clubs utilisateurs" },
  { value: "12 000+", label: "Visuels générés" },
  { value: "98%", label: "Satisfaction client" },
  { value: "3h/sem", label: "Économisées en moyenne" },
];

const features = [
  {
    icon: IconTrophy,
    title: "Résultats automatiques",
    desc: "Les résultats de vos matchs sont récupérés automatiquement et transformés en visuels prêts à publier.",
    details: ["Synchronisation avec votre ligue", "Visuel généré en moins d'1 minute", "Publication immédiate ou planifiée"],
  },
  {
    icon: IconCalendar,
    title: "Planification intelligente",
    desc: "Programmez une fois, publiez toujours. Le système s'adapte à votre calendrier sportif chaque semaine.",
    details: ["Calendrier automatique par équipe", "Horaires personnalisables", "Rappels et alertes"],
  },
  {
    icon: IconPhoto,
    title: "Visuels personnalisés",
    desc: "Créez des templates aux couleurs de votre club. Chaque publication reflète votre identité visuelle.",
    details: ["Templates illimités", "Éditeur visuel intégré", "Formats Post et Story"],
  },
  {
    icon: IconBrandInstagram,
    title: "Publication directe",
    desc: "Connectez Instagram et Facebook, AutoMaComm publie directement sur vos réseaux sociaux.",
    details: ["Instagram & Facebook natifs", "Légendes automatiques", "Hashtags personnalisés"],
  },
  {
    icon: IconClock,
    title: "Gain de temps radical",
    desc: "Fini les heures passées sur Canva. En 5 minutes, votre communication sportive est gérée pour la semaine.",
    details: ["Setup en moins de 15 min", "0 compétence graphique requise", "Automatisation complète"],
  },
  {
    icon: IconBolt,
    title: "Sans compétences requises",
    desc: "Interface pensée pour tous les bénévoles, peu importe leur niveau. Aucune formation nécessaire.",
    details: ["Interface guidée", "Support inclus", "Onboarding pas à pas"],
  },
];

const testimonials = [
  { name: "Marc Lefebvre", role: "Président — FC Bergerac", text: "On gagnait 3h par semaine sur notre communication. Maintenant c'est 0 minute, tout est automatique.", stars: 5 },
  { name: "Sophie Renard", role: "Community Manager — AS Moirans", text: "L'interface est tellement simple que même notre secrétaire bénévole peut gérer les publications.", stars: 5 },
  { name: "Karim Benali", role: "Dirigeant — USL Dunkerque B", text: "Nos supporters adorent la régularité de nos posts. L'image du club a vraiment changé.", stars: 5 },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <Box bg="brand.7" py={96} style={{ position: "relative", overflow: "hidden" }}>
        <Box style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 50%, #0A5EBF 0%, transparent 60%)", opacity: 0.6 }} />
        <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
          <Stack align="center" ta="center" gap="lg" maw={700} mx="auto">
            <Badge variant="light" color="yellow" radius="xl" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Fonctionnalités
            </Badge>
            <Title c="#F5F3EB" style={{ fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.15 }}>
              Tout ce dont votre club a besoin
            </Title>
            <Text c="rgba(245,243,235,0.7)" fz="lg" style={{ lineHeight: 1.7 }}>
              AutoMaComm centralise l'ensemble de votre communication sportive. Des résultats à la publication, tout est automatisé.
            </Text>
            <Link href="/register" style={{ textDecoration: "none" }}>
              <Button size="lg" style={{ background: "#F5F3EB", color: "#04346D" }} rightSection={<IconArrowRight size={16} />}>
                Essayer gratuitement
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      {/* Stats */}
      <Box bg="white" py="xl" style={{ borderBottom: "1px solid rgba(4,52,109,0.08)" }}>
        <Container size="md">
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            {stats.map((stat) => (
              <Stack key={stat.label} align="center" gap={4}>
                <Text style={{ fontSize: "1.75rem", fontWeight: 800 }} c="brand.7">{stat.value}</Text>
                <Text fz="sm" c="rgba(4,52,109,0.6)">{stat.label}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features grid */}
      <Box bg="#F5F3EB" py={96}>
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
            {features.map(({ icon: Icon, title, desc, details }) => (
              <Paper key={title} withBorder p="xl" style={{ border: "1px solid rgba(4,52,109,0.06)" }}>
                <Box
                  w={44} h={44} mb="lg"
                  style={{ borderRadius: "0.75rem", background: "rgba(4,52,109,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Icon size={20} color="#04346D" />
                </Box>
                <Text fw={700} c="brand.7" mb="xs" fz="md">{title}</Text>
                <Text fz="sm" c="rgba(4,52,109,0.6)" mb="md" style={{ lineHeight: 1.6 }}>{desc}</Text>
                <Stack gap={6}>
                  {details.map((d) => (
                    <Group key={d} gap="xs" wrap="nowrap">
                      <Box w={18} h={18} style={{ borderRadius: "50%", background: "rgba(15,155,88,0.12)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <IconCheck size={11} color="#0F9B58" strokeWidth={3} />
                      </Box>
                      <Text fz="xs" c="rgba(4,52,109,0.65)">{d}</Text>
                    </Group>
                  ))}
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Réseaux */}
      <Box bg="white" py={80}>
        <Container size="md">
          <Stack align="center" ta="center" gap="lg">
            <Badge variant="light" color="brand" radius="xl" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>Intégrations</Badge>
            <Title order={2} c="brand.7" style={{ fontSize: "2rem", fontWeight: 700 }}>Publier là où sont vos supporters</Title>
            <Text c="rgba(4,52,109,0.6)" maw={480} fz="md">
              Connectez vos comptes en quelques clics. AutoMaComm publie pour vous, au bon moment, sur le bon réseau.
            </Text>
            <Group gap="xl" justify="center" mt="md">
              <Group gap="sm">
                <Box w={48} h={48} style={{ borderRadius: 14, background: "rgba(219,39,119,0.1)", display: "grid", placeItems: "center" }}>
                  <IconBrandInstagram size={24} color="#DB2777" />
                </Box>
                <Stack gap={0} align="flex-start">
                  <Text fw={700} c="brand.7" fz="sm">Instagram</Text>
                  <Text fz="xs" c="rgba(4,52,109,0.5)">Posts & Stories</Text>
                </Stack>
              </Group>
              <Group gap="sm">
                <Box w={48} h={48} style={{ borderRadius: 14, background: "rgba(37,99,235,0.1)", display: "grid", placeItems: "center" }}>
                  <IconBrandFacebook size={24} color="#2563EB" />
                </Box>
                <Stack gap={0} align="flex-start">
                  <Text fw={700} c="brand.7" fz="sm">Facebook</Text>
                  <Text fz="xs" c="rgba(4,52,109,0.5)">Publications & Événements</Text>
                </Stack>
              </Group>
            </Group>
          </Stack>
        </Container>
      </Box>

       {/* Testimonials */}
       <Box bg="#F5F3EB" py={96}>
        <Container size="xl">
          <Stack align="center" mb={64} gap="sm">
            <Badge variant="light" color="brand" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>Témoignages</Badge>
            <Title order={2} c="brand.7" ta="center" style={{ fontSize: "2.2rem", fontWeight: 700 }}>Ils font confiance à AutoMaComm</Title>
          </Stack>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
            {testimonials.map((t) => (
              <Paper key={t.name} withBorder style={{ border: "1px solid rgba(4,52,109,0.06)" }} p="xl">
                <Group gap={2} mb="md">
                  {[...Array(t.stars)].map((_, i) => (
                    <IconStar key={i} size={16} color="#facc15" fill="#facc15" />
                  ))}
                </Group>
                <Text fz="sm" c="rgba(4,52,109,0.7)" mb="lg" style={{ lineHeight: 1.7 }}>"{t.text}"</Text>
                <Text fz="sm" fw={600} c="brand.7">{t.name}</Text>
                <Text fz="xs" c="rgba(4,52,109,0.5)">{t.role}</Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA */}
      <Box bg="brand.7" py={80} style={{ position: "relative", overflow: "hidden" }}>
        <Box style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(245,243,235,0.05)" }} />
        <Container size="sm" style={{ position: "relative", zIndex: 1 }}>
          <Stack align="center" ta="center" gap="lg">
            <Title c="#F5F3EB" style={{ fontSize: "2.2rem", fontWeight: 800, lineHeight: 1.2 }}>
              Prêt à passer à l'automatique ?
            </Title>
            <Text c="rgba(245,243,235,0.65)" fz="md">
              14 jours d'essai gratuit, sans carte bancaire.
            </Text>
            <Group gap="md" justify="center" wrap="wrap">
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button size="lg" style={{ background: "#F5F3EB", color: "#04346D" }} rightSection={<IconArrowRight size={16} />}>
                  Démarrer gratuitement
                </Button>
              </Link>
              <Link href="/pricing" style={{ textDecoration: "none" }}>
                <Button variant="outline" size="lg" style={{ borderColor: "rgba(245,243,235,0.3)", color: "rgba(245,243,235,0.85)" }}>
                  Voir les tarifs
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
