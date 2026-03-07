import { Mail, Phone, Clock, MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

const infos = [
  { icon: Mail, label: "Email", value: "contact@automacomm.fr" },
  { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89" },
  { icon: Clock, label: "Disponibilité", value: "Lun–Ven, 9h–18h" },
  { icon: MapPin, label: "Localisation", value: "Paris, France" },
];

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", club: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: "#F5F3EB" }}>
      {/* Header */}
      <section className="py-20" style={{ background: "#04346D" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-5" style={{ background: "rgba(245,243,235,0.12)", color: "rgba(245,243,235,0.8)", border: "1px solid rgba(245,243,235,0.15)" }}>
            Contact
          </span>
          <h1 className="mb-4" style={{ color: "#F5F3EB", fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.15 }}>
            Une question ? On est là.
          </h1>
          <p className="text-base" style={{ color: "rgba(245,243,235,0.65)" }}>
            Notre équipe répond en général sous 24h ouvrées. N'hésitez pas !
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="rounded-2xl p-8" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(4,52,109,0.06)" }}>
                  <CheckCircle className="w-8 h-8" style={{ color: "#04346D" }} />
                </div>
                <h3 className="mb-2" style={{ color: "#04346D", fontWeight: 700 }}>Message envoyé !</h3>
                <p className="text-sm" style={{ color: "rgba(4,52,109,0.6)", lineHeight: 1.6 }}>
                  Merci pour votre message. Notre équipe vous répondra dans les 24h ouvrées.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 px-5 py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
                  style={{ background: "#04346D", color: "white", fontWeight: 500 }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <h2 className="mb-6" style={{ color: "#04346D", fontWeight: 700 }}>Envoyez-nous un message</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Nom complet</label>
                      <input
                        type="text"
                        placeholder="Jean Dupont"
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Nom du club</label>
                      <input
                        type="text"
                        placeholder="FC Mon Club"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Email</label>
                    <input
                      type="email"
                      placeholder="jean@fcmonclub.fr"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Sujet</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                    >
                      <option>Question sur les fonctionnalités</option>
                      <option>Demande de démo</option>
                      <option>Question sur la facturation</option>
                      <option>Support technique</option>
                      <option>Partenariat</option>
                      <option>Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Message</label>
                    <textarea
                      placeholder="Décrivez votre question ou demande..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "#04346D", fontWeight: 600 }}
                  >
                    <Send className="w-4 h-4" />
                    Envoyer le message
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Info side */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="mb-2" style={{ color: "#04346D", fontWeight: 700 }}>Nos coordonnées</h2>
              <p className="text-sm" style={{ color: "rgba(4,52,109,0.6)", lineHeight: 1.7 }}>
                Vous préférez nous joindre directement ? Voici toutes les façons de nous contacter.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {infos.map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-5 rounded-2xl" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(4,52,109,0.06)" }}>
                    <Icon className="w-4 h-4" style={{ color: "#04346D" }} />
                  </div>
                  <p className="text-xs mb-0.5" style={{ color: "rgba(4,52,109,0.5)" }}>{label}</p>
                  <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Demo CTA */}
            <div className="rounded-2xl p-6" style={{ background: "#04346D" }}>
              <h3 className="mb-2" style={{ color: "#F5F3EB", fontWeight: 600 }}>Vous préférez une démo ?</h3>
              <p className="text-sm mb-5" style={{ color: "rgba(245,243,235,0.6)", lineHeight: 1.6 }}>
                Réservez un créneau de 30 minutes avec notre équipe. On vous montre tout en direct.
              </p>
              <button className="px-5 py-2.5 rounded-xl text-sm transition-all hover:opacity-90" style={{ background: "#F5F3EB", color: "#04346D", fontWeight: 600 }}>
                Réserver une démo →
              </button>
            </div>

            {/* FAQ preview */}
            <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
              <h3 className="mb-4" style={{ color: "#04346D", fontWeight: 600 }}>Questions fréquentes</h3>
              <div className="space-y-3">
                {[
                  "Comment connecter Instagram ?",
                  "Puis-je annuler à tout moment ?",
                  "L'outil fonctionne pour quel sport ?",
                ].map((q) => (
                  <div key={q} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "rgba(4,52,109,0.06)" }}>
                    <span className="text-sm" style={{ color: "rgba(4,52,109,0.7)" }}>{q}</span>
                    <span style={{ color: "rgba(4,52,109,0.3)" }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
