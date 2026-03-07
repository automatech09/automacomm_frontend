import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "AutoMaComm — La communication de votre club, en automatique.",
  description:
    "AutoMaComm récupère vos résultats, crée vos visuels et publie automatiquement sur Instagram et Facebook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
