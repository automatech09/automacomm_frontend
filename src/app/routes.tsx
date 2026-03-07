import { createBrowserRouter } from "react-router";
import { PublicLayout } from "./components/layout/PublicLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LandingPage } from "./pages/public/LandingPage";
import { PricingPage } from "./pages/public/PricingPage";
import { LoginPage } from "./pages/public/LoginPage";
import { RegisterPage } from "./pages/public/RegisterPage";
import { ContactPage } from "./pages/public/ContactPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { TeamsPage } from "./pages/dashboard/TeamsPage";
import { TemplatesPage } from "./pages/dashboard/TemplatesPage";
import { ManualGenerationPage } from "./pages/dashboard/ManualGenerationPage";
import { SchedulingPage } from "./pages/dashboard/SchedulingPage";
import { BackgroundsPage } from "./pages/dashboard/BackgroundsPage";
import { NetworksPage } from "./pages/dashboard/NetworksPage";
import { SettingsPage } from "./pages/dashboard/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "pricing", Component: PricingPage },
      { path: "contact", Component: ContactPage },
    ],
  },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "teams", Component: TeamsPage },
      { path: "templates", Component: TemplatesPage },
      { path: "generation", Component: ManualGenerationPage },
      { path: "scheduling", Component: SchedulingPage },
      { path: "backgrounds", Component: BackgroundsPage },
      { path: "networks", Component: NetworksPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
