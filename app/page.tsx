import Link from "next/link";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconTrophy,
  IconCircleCheck,
  IconArrowRight,
  IconPlayerPlay,
  IconStar,
} from "@tabler/icons-react";
import PublicLayout from "@/components/PublicLayout";
import {
  Box,
  Container,
  Stack,
  Group,
  SimpleGrid,
  Text,
  Title,
  Button,
  Paper,
  Badge,
} from "@mantine/core";

const heroImg = "https://images.unsplash.com/photo-1762445964939-123200d655ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwbmlnaHQlMjBsaWdodHN8ZW58MXx8fHwxNzcyMzc4NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const teamImg = "https://images.unsplash.com/photo-1758470476264-bf1cf2b6ea66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNwb3J0cyUyMGNsdWIlMjB0ZWFtJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzcyMzc4NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const socialImg = "https://images.unsplash.com/photo-1759215524600-7971d6a4dac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnQlMjBjcmVhdG9yJTIwcGhvbmV8ZW58MXx8fHwxNzcyMzc4NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080";

const steps = [
  { num: "01", title: "Créez votre club", desc: "Renseignez vos équipes, vos couleurs et connectez vos réseaux sociaux en quelques minutes." },
  { num: "02", title: "Définissez vos templates", desc: "Personnalisez vos modèles de visuels pour chaque type de contenu : résultat, affiche, classement." },
  { num: "03", title: "Activez l'automatisation", desc: "Programmez vos publications et laissez AutoMaComm gérer le reste. C'est tout !" },
];



export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <Box bg="brand.7" style={{ position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Box style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
          <img src={heroImg} alt="Stadium" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Box style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #04346D 60%, #0A5EBF 100%)" }} />
        <Box style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 50%, #F5F3EB 0%, transparent 60%)", opacity: 0.1 }} />

        <Container size="xl" py={96} style={{ position: "relative", zIndex: 1 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={64} style={{ alignItems: "center" }}>
            <Stack gap="lg">
              <Group gap="xs" style={{ display: "inline-flex", background: "rgba(245,243,235,0.15)", border: "1px solid rgba(245,243,235,0.2)", borderRadius: "9999px", padding: "0.35rem 0.75rem", width: "fit-content" }}>
                <Box w={6} h={6} style={{ borderRadius: "50%", background: "#4ade80" }} />
                <Text fz="xs" c="rgba(245,243,235,0.9)">Déjà 500+ clubs utilisateurs</Text>
              </Group>

              <Title c="#F5F3EB" style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1.15 }}>
                La communication<br />
                <Text span c="rgba(245,243,235,0.6)">de votre club,</Text><br />
                en automatique.
              </Title>

              <Text fz="lg" c="rgba(245,243,235,0.7)" style={{ lineHeight: 1.7 }}>
                AutoMaComm récupère vos résultats, crée vos visuels et publie automatiquement sur Instagram et Facebook. Zéro effort, résultat professionnel.
              </Text>

              <Group gap="md" wrap="wrap">
                <Link href="/register" style={{ textDecoration: "none" }}>
                  <Button size="lg" style={{ background: "#F5F3EB", color: "#04346D" }} rightSection={<IconArrowRight size={16} />}>
                    Démarrer gratuitement
                  </Button>
                </Link>
                <Button variant="outline" size="lg" style={{ borderColor: "rgba(245,243,235,0.3)", color: "rgba(245,243,235,0.85)" }} leftSection={<IconPlayerPlay size={16} />}>
                  Voir la démo
                </Button>
              </Group>

              <Text fz="xs" c="rgba(245,243,235,0.4)">
                14 jours d'essai gratuit · Aucune carte requise · Annulation à tout moment
              </Text>
            </Stack>

            <Box visibleFrom="md" style={{ position: "relative" }}>
              <Box style={{ borderRadius: "0.75rem", overflow: "hidden", aspectRatio: "4/3", position: "relative", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
                <img src={teamImg} alt="Club" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <Box style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,52,109,0.9) 0%, transparent 50%)" }} />
                <Stack gap="xs" style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <Paper style={{ background: "rgba(245,243,235,0.95)", backdropFilter: "blur(10px)" }} p="sm" radius="lg">
                    <Group justify="space-between">
                      <Group gap="sm">
                        <Box w={32} h={32} bg="brand.7" style={{ borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <IconTrophy size={16} color="white" />
                        </Box>
                        <Stack gap={0}>
                          <Text fz="xs" fw={600} c="brand.7">Visuel généré automatiquement</Text>
                          <Text fz="xs" c="rgba(4,52,109,0.6)">FC Beaumont 3 — 1 AS Millery</Text>
                        </Stack>
                      </Group>
                      <Badge color="green" variant="light" size="xs">Publié ✓</Badge>
                    </Group>
                  </Paper>
                  <Paper style={{ background: "rgba(4,52,109,0.8)", backdropFilter: "blur(10px)" }} px="sm" py="xs" radius="lg">
                    <Group gap="xs">
                      <IconBrandInstagram size={14} color="#f472b6" />
                      <IconBrandFacebook size={14} color="#93c5fd" />
                      <Text fz="xs" c="rgba(245,243,235,0.8)">Publication automatique dans 2h</Text>
                    </Group>
                  </Paper>
                </Stack>
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* How it works */}
      <Box bg="white" py={96} style={{ borderTop: "1px solid rgba(4,52,109,0.06)", borderBottom: "1px solid rgba(4,52,109,0.06)" }}>
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={64} style={{ alignItems: "center" }}>
            <Stack gap="xl">
              <Stack gap="sm">
                <Badge variant="light" color="brand" style={{ textTransform: "uppercase", letterSpacing: "0.1em", width: "fit-content" }}>Comment ça marche</Badge>
                <Title order={2} c="brand.7" style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.2 }}>
                  3 étapes pour automatiser votre comm'
                </Title>
                <Text c="rgba(4,52,109,0.6)" fz="md">
                  Configurer AutoMaComm prend moins de 15 minutes. Ensuite, tout fonctionne seul, semaine après semaine.
                </Text>
              </Stack>
              <Stack gap="xl">
                {steps.map((step) => (
                  <Group key={step.num} gap="lg" align="flex-start">
                    <Box
                      w={40}
                      h={40}
                      bg="brand.7"
                      style={{ borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    >
                      <Text c="#F5F3EB" fz="sm" fw={700}>{step.num}</Text>
                    </Box>
                    <Stack gap={4}>
                      <Text fw={600} c="brand.7">{step.title}</Text>
                      <Text fz="sm" c="rgba(4,52,109,0.6)" style={{ lineHeight: 1.6 }}>{step.desc}</Text>
                    </Stack>
                  </Group>
                ))}
              </Stack>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button bg="brand.7" size="md" style={{ width: "fit-content" }} rightSection={<IconArrowRight size={16} />}>
                  Commencer maintenant
                </Button>
              </Link>
            </Stack>

            <Box style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 20px 40px rgba(4,52,109,0.15)" }}>
              <img src={socialImg} alt="Social media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <Box style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,52,109,0.7) 0%, transparent 40%)" }} />
              <Paper style={{ position: "absolute", bottom: 20, left: 20, right: 20, background: "rgba(245,243,235,0.95)", backdropFilter: "blur(10px)" }} p="md" radius="lg">
                <Group gap="xs" mb="xs">
                  <IconCircleCheck size={16} color="#22c55e" />
                  <Text fz="sm" fw={600} c="brand.7">3 publications planifiées cette semaine</Text>
                </Group>
                <Group gap="xs">
                  <IconBrandInstagram size={14} color="#ec4899" />
                  <IconBrandFacebook size={14} color="#2563eb" />
                  <Text fz="xs" c="rgba(4,52,109,0.6)">Publication automatique activée</Text>
                </Group>
              </Paper>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>


      {/* CTA */}
      <Box bg="brand.7" py={96} style={{ position: "relative", overflow: "hidden" }}>
        <Box style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
          <img src={heroImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Container size="sm" style={{ position: "relative", zIndex: 1 }}>
          <Stack align="center" ta="center" gap="lg">
            <Title c="#F5F3EB" style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.2 }}>
              Prêt à automatiser la communication de votre club ?
            </Title>
            <Text c="rgba(245,243,235,0.65)" fz="md">
              Rejoignez les 500+ clubs qui ont repris du temps grâce à AutoMaComm.
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
    </PublicLayout>
  );
}
