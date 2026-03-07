import { Link } from "react-router";
import { Zap, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState } from "react";

const benefits = [
  "14 jours d'essai gratuit",
  "Aucune carte bancaire requise",
  "Configuration en 5 minutes",
  "Annulation à tout moment",
];

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    clubName: "",
    plan: "pro",
  });

  return (
    <div className="min-h-screen flex" style={{ background: "#F5F3EB" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] p-12 relative overflow-hidden" style={{ background: "#04346D" }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 70% 30%, #0A5EBF 0%, transparent 60%)" }} />

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,243,235,0.15)" }}>
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-white text-lg" style={{ fontWeight: 700 }}>AutoMaComm</span>
        </Link>

        <div className="relative z-10">
          <h2 className="mb-6" style={{ color: "#F5F3EB", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1.3 }}>
            Votre club mérite une communication professionnelle.
          </h2>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(245,243,235,0.7)" }} />
                <span className="text-sm" style={{ color: "rgba(245,243,235,0.8)" }}>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 p-5 rounded-2xl" style={{ background: "rgba(245,243,235,0.08)", border: "1px solid rgba(245,243,235,0.12)" }}>
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-sm mb-3" style={{ color: "rgba(245,243,235,0.8)", lineHeight: 1.6 }}>
              "En 10 minutes on a tout configuré. Maintenant ça tourne tout seul !"
            </p>
            <p className="text-xs" style={{ color: "rgba(245,243,235,0.45)" }}>Sophie Renard — AS Moirans</p>
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color: "rgba(245,243,235,0.3)" }}>
          © 2026 AutoMaComm
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#04346D" }}>
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="text-lg" style={{ color: "#04346D", fontWeight: 700 }}>AutoMaComm</span>
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all"
                  style={{
                    background: step >= s ? "#04346D" : "rgba(4,52,109,0.1)",
                    color: step >= s ? "white" : "rgba(4,52,109,0.4)",
                    fontWeight: 600,
                  }}
                >
                  {step > s ? "✓" : s}
                </div>
                {s < 2 && <div className="w-12 h-0.5" style={{ background: step > s ? "#04346D" : "rgba(4,52,109,0.12)" }} />}
              </div>
            ))}
            <span className="text-xs ml-2" style={{ color: "rgba(4,52,109,0.5)" }}>
              {step === 1 ? "Votre compte" : "Votre club"}
            </span>
          </div>

          {step === 1 ? (
            <>
              <div className="mb-7">
                <h1 className="mb-1.5" style={{ color: "#04346D", fontSize: "1.7rem", fontWeight: 700 }}>Créez votre compte</h1>
                <p className="text-sm" style={{ color: "rgba(4,52,109,0.55)" }}>14 jours gratuits, sans carte bancaire.</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Prénom</label>
                    <input
                      type="text"
                      placeholder="Jean"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "white", border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Nom</label>
                    <input
                      type="text"
                      placeholder="Dupont"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "white", border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Email professionnel</label>
                  <input
                    type="email"
                    placeholder="jean@fcmonclub.fr"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "white", border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="8 caractères minimum"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none pr-11"
                      style={{ background: "white", border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}
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

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-sm text-white transition-all hover:opacity-90 mt-1"
                  style={{ background: "#04346D", fontWeight: 600 }}
                >
                  Continuer →
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-7">
                <h1 className="mb-1.5" style={{ color: "#04346D", fontSize: "1.7rem", fontWeight: 700 }}>Votre club</h1>
                <p className="text-sm" style={{ color: "rgba(4,52,109,0.55)" }}>Quelques informations pour configurer votre espace.</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Nom du club</label>
                  <input
                    type="text"
                    placeholder="FC Mon Club"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "white", border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Votre rôle dans le club</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "white", border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}
                  >
                    <option>Président</option>
                    <option>Secrétaire</option>
                    <option>Community Manager</option>
                    <option>Bénévole</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Discipline sportive</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "white", border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}
                  >
                    <option>Football</option>
                    <option>Basketball</option>
                    <option>Rugby</option>
                    <option>Handball</option>
                    <option>Volleyball</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2" style={{ color: "#04346D", fontWeight: 500 }}>Plan choisi</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Starter", "Pro", "Club"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm({ ...form, plan: p.toLowerCase() })}
                        className="py-2.5 rounded-xl text-sm transition-all"
                        style={{
                          background: form.plan === p.toLowerCase() ? "#04346D" : "white",
                          color: form.plan === p.toLowerCase() ? "white" : "rgba(4,52,109,0.6)",
                          border: `1.5px solid ${form.plan === p.toLowerCase() ? "#04346D" : "rgba(4,52,109,0.15)"}`,
                          fontWeight: 500,
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 rounded-xl text-sm transition-all hover:opacity-80"
                    style={{ border: "1.5px solid rgba(4,52,109,0.2)", color: "#04346D" }}
                  >
                    ← Retour
                  </button>
                  <Link
                    to="/dashboard"
                    className="flex-1 py-3.5 rounded-xl text-sm text-white text-center transition-all hover:opacity-90"
                    style={{ background: "#04346D", fontWeight: 600 }}
                  >
                    Créer mon espace
                  </Link>
                </div>
              </form>
            </>
          )}

          <p className="mt-6 text-sm text-center" style={{ color: "rgba(4,52,109,0.5)" }}>
            Déjà un compte ?{" "}
            <Link to="/login" className="hover:underline" style={{ color: "#04346D", fontWeight: 600 }}>
              Se connecter
            </Link>
          </p>

          <p className="mt-4 text-xs text-center" style={{ color: "rgba(4,52,109,0.35)" }}>
            En vous inscrivant, vous acceptez nos{" "}
            <span className="underline cursor-pointer">CGU</span> et notre{" "}
            <span className="underline cursor-pointer">Politique de confidentialité</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
