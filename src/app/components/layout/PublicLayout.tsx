import { Outlet, Link, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Fonctionnalités", href: "/#features" },
    { label: "Tarifs", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F5F3EB" }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ borderColor: "rgba(4,52,109,0.1)", background: "rgba(245,243,235,0.92)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#04346D" }}>
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-xl tracking-tight" style={{ color: "#04346D", fontWeight: 700 }}>
              AutoMaComm
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: "#04346D" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm px-4 py-2 rounded-lg transition-all hover:opacity-80"
              style={{ color: "#04346D" }}
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="text-sm px-5 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: "#04346D" }}
            >
              Essai gratuit
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#04346D" }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(4,52,109,0.1)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm py-2"
                style={{ color: "#04346D" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" className="text-sm py-2 text-center rounded-lg border" style={{ color: "#04346D", borderColor: "#04346D" }}>
                Connexion
              </Link>
              <Link to="/register" className="text-sm py-2 text-center rounded-lg text-white" style={{ background: "#04346D" }}>
                Essai gratuit
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ background: "#04346D", borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                <Zap className="w-3.5 h-3.5 text-white" fill="white" />
              </div>
              <span className="text-white text-lg" style={{ fontWeight: 700 }}>AutoMaComm</span>
            </div>
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className="text-sm transition-opacity hover:opacity-70" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              © 2026 AutoMaComm. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
