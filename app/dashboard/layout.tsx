"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Layout,
  Wand2,
  CalendarClock,
  Image,
  Share2,
  Settings,
  Zap,
  ChevronRight,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Mes équipes", href: "/dashboard/teams" },
  { icon: Layout, label: "Templates", href: "/dashboard/templates" },
  { icon: Wand2, label: "Génération manuelle", href: "/dashboard/generation" },
  { icon: CalendarClock, label: "Planification", href: "/dashboard/scheduling" },
  { icon: Image, label: "Arrière-plans", href: "/dashboard/backgrounds" },
  { icon: Share2, label: "Mes réseaux", href: "/dashboard/networks" },
  { icon: Settings, label: "Paramètres", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F5F3EB" }}>
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed md:sticky top-0 h-screen z-30 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ width: 240, background: "#04346D", minHeight: "100vh" }}
      >
        <div className="px-5 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-white text-base" style={{ fontWeight: 700 }}>
              AutoMaComm
            </span>
          </Link>
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className="mx-4 mb-4 p-3 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
          >
            FC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs truncate" style={{ fontWeight: 600 }}>
              FC Beaumont
            </p>
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>
              Plan Pro
            </p>
          </div>
          <ChevronRight
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: "rgba(255,255,255,0.4)" }}
          />
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
              style={{
                color: isActive(href) ? "white" : "rgba(255,255,255,0.6)",
                background: isActive(href) ? "rgba(255,255,255,0.15)" : "transparent",
                fontWeight: isActive(href) ? 500 : 400,
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
              {isActive(href) ? <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" /> : null}
            </Link>
          ))}
        </nav>

        <div className="p-4 space-y-2 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3 px-2 py-2">
            <div
              className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs truncate" style={{ fontWeight: 500 }}>
                Jean Dupont
              </p>
              <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>
                jean@fcbeaumont.fr
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between border-b"
          style={{
            background: "rgba(245,243,235,0.95)",
            backdropFilter: "blur(8px)",
            borderColor: "rgba(4,52,109,0.08)",
          }}
        >
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#04346D" }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block" />

          <div className="flex items-center gap-3">
            <button
              className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
              style={{ background: "white", border: "1px solid rgba(4,52,109,0.1)" }}
            >
              <Bell className="w-4 h-4" style={{ color: "#04346D" }} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "#04346D" }}
            >
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
