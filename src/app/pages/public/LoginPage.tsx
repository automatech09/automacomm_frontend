import { Link } from "react-router";
import { Zap, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div className="min-h-screen flex" style={{ background: "#F5F3EB" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden" style={{ background: "#04346D" }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 30% 70%, #0A5EBF 0%, transparent 60%)" }} />
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,243,235,0.15)" }}>
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-white text-lg" style={{ fontWeight: 700 }}>AutoMaComm</span>
        </Link>

        <div className="relative z-10">
          <blockquote className="mb-6">
            <p className="text-xl mb-4" style={{ color: "#F5F3EB", fontWeight: 600, lineHeight: 1.5 }}>
              "Depuis AutoMaComm, notre club publie 3x plus régulièrement sur les réseaux, sans effort supplémentaire."
            </p>
            <footer>
              <p className="text-sm" style={{ color: "rgba(245,243,235,0.7)" }}>Marc Lefebvre</p>
              <p className="text-xs" style={{ color: "rgba(245,243,235,0.45)" }}>Président — FC Bergerac</p>
            </footer>
          </blockquote>

          {/* Mock visual */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(245,243,235,0.08)", border: "1px solid rgba(245,243,235,0.12)" }}>
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(245,243,235,0.1)" }}>
              <div className="w-8 h-8 rounded-lg" style={{ background: "rgba(245,243,235,0.2)" }} />
              <div className="flex-1">
                <div className="h-2 w-24 rounded mb-1.5" style={{ background: "rgba(245,243,235,0.3)" }} />
                <div className="h-1.5 w-16 rounded" style={{ background: "rgba(245,243,235,0.15)" }} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.2)", color: "rgb(134,239,172)" }}>✓ Publié</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(245,243,235,0.06)" }}>
              <div className="w-8 h-8 rounded-lg" style={{ background: "rgba(245,243,235,0.15)" }} />
              <div className="flex-1">
                <div className="h-2 w-32 rounded mb-1.5" style={{ background: "rgba(245,243,235,0.2)" }} />
                <div className="h-1.5 w-20 rounded" style={{ background: "rgba(245,243,235,0.1)" }} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(245,243,235,0.15)", color: "rgba(245,243,235,0.6)" }}>Demain</span>
            </div>
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: "rgba(245,243,235,0.35)" }}>
          © 2026 AutoMaComm — La comm' de votre club, en automatique.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#04346D" }}>
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg" style={{ color: "#04346D", fontWeight: 700 }}>AutoMaComm</span>
          </Link>

          <div className="mb-8">
            <h1 className="mb-2" style={{ color: "#04346D", fontSize: "1.8rem", fontWeight: 700 }}>Bon retour 👋</h1>
            <p className="text-sm" style={{ color: "rgba(4,52,109,0.55)" }}>Connectez-vous à votre espace club.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Email</label>
              <input
                type="email"
                placeholder="jean@fcmonclub.fr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "white",
                  border: "1.5px solid rgba(4,52,109,0.15)",
                  color: "#04346D",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#04346D")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(4,52,109,0.15)")}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm" style={{ color: "#04346D", fontWeight: 500 }}>Mot de passe</label>
                <button type="button" className="text-xs hover:underline" style={{ color: "rgba(4,52,109,0.55)" }}>
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all pr-11"
                  style={{
                    background: "white",
                    border: "1.5px solid rgba(4,52,109,0.15)",
                    color: "#04346D",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#04346D")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(4,52,109,0.15)")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(4,52,109,0.4)" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center py-3.5 rounded-xl text-sm text-white transition-all hover:opacity-90 mt-2"
              style={{ background: "#04346D", fontWeight: 600 }}
            >
              Se connecter
            </Link>
          </form>

          <div className="mt-6 relative flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "rgba(4,52,109,0.1)" }} />
            <span className="text-xs" style={{ color: "rgba(4,52,109,0.4)" }}>ou</span>
            <div className="flex-1 h-px" style={{ background: "rgba(4,52,109,0.1)" }} />
          </div>

          <button className="mt-5 w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm transition-all hover:opacity-80" style={{ background: "white", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </button>

          <p className="mt-8 text-sm text-center" style={{ color: "rgba(4,52,109,0.5)" }}>
            Pas encore de compte ?{" "}
            <Link to="/register" className="hover:underline" style={{ color: "#04346D", fontWeight: 600 }}>
              S'inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
