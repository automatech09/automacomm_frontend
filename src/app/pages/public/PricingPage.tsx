import { Link } from "react-router";
import { CheckCircle, ArrowRight, Zap, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "19",
    period: "/mois",
    desc: "Parfait pour débuter. Une équipe, des résultats automatiques.",
    highlight: false,
    badge: null,
    features: [
      "1 équipe",
      "Récupération auto des résultats",
      "3 templates inclus",
      "Publication Instagram + Facebook",
      "5 arrière-plans en réserve",
      "Support par email",
    ],
    cta: "Commencer l'essai",
  },
  {
    name: "Pro",
    price: "39",
    period: "/mois",
    desc: "Pour les clubs actifs avec plusieurs équipes et un vrai besoin de visibilité.",
    highlight: true,
    badge: "Le plus populaire",
    features: [
      "Jusqu'à 5 équipes",
      "Récupération auto des résultats",
      "Templates illimités + builder",
      "Génération manuelle de visuels",
      "Publication Instagram + Facebook",
      "Réserve aléatoire illimitée",
      "Planification avancée",
      "Support prioritaire",
    ],
    cta: "Commencer l'essai",
  },
  {
    name: "Club",
    price: "79",
    period: "/mois",
    desc: "Pour les grands clubs avec plusieurs sections et plusieurs utilisateurs.",
    highlight: false,
    badge: null,
    features: [
      "Équipes illimitées",
      "Tout du plan Pro",
      "Multi-utilisateurs (jusqu'à 5)",
      "Templates personnalisés sur mesure",
      "Statistiques de publication",
      "Accès API",
      "Onboarding dédié",
      "Support téléphonique",
    ],
    cta: "Nous contacter",
  },
];

const faqs = [
  { q: "Faut-il des compétences techniques pour utiliser AutoMaComm ?", a: "Absolument pas. L'interface a été conçue pour des bénévoles et des présidents de club, sans aucune formation requise. Si vous savez utiliser un smartphone, vous saurez utiliser AutoMaComm." },
  { q: "Comment se fait la récupération des résultats ?", a: "AutoMaComm se connecte aux bases de données sportives françaises (FFF, Footeo, etc.) et récupère automatiquement les résultats, classements et prochains matchs de votre équipe." },
  { q: "Puis-je annuler à tout moment ?", a: "Oui, sans engagement. Vous pouvez annuler votre abonnement à tout moment depuis vos paramètres. Aucune pénalité, aucune démarche complexe." },
  { q: "Quels réseaux sociaux sont supportés ?", a: "AutoMaComm publie actuellement sur Instagram et Facebook. La prise en charge de X (Twitter) et TikTok est prévue pour fin 2026." },
  { q: "Est-ce que je peux essayer avant de payer ?", a: "Oui ! Tous les plans bénéficient d'un essai gratuit de 14 jours, sans carte bancaire requise. Vous choisissez votre plan après l'essai." },
];

export function PricingPage() {
  return (
    <div style={{ background: "#F5F3EB" }}>
      {/* Hero */}
      <section className="py-20" style={{ background: "#04346D" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-5" style={{ background: "rgba(245,243,235,0.12)", color: "rgba(245,243,235,0.8)", border: "1px solid rgba(245,243,235,0.15)" }}>
            Tarifs
          </span>
          <h1 className="mb-5" style={{ color: "#F5F3EB", fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.15 }}>
            Simple, transparent, sans surprise
          </h1>
          <p className="text-base" style={{ color: "rgba(245,243,235,0.65)", lineHeight: 1.7 }}>
            14 jours d'essai gratuit sur tous les plans. Aucune carte bancaire requise. Annulation en un clic.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-7 flex flex-col transition-all hover:shadow-lg"
                style={{
                  background: plan.highlight ? "#04346D" : "white",
                  border: plan.highlight ? "none" : "1px solid rgba(4,52,109,0.08)",
                  transform: plan.highlight ? "scale(1.02)" : "scale(1)",
                }}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ background: "#F5F3EB", color: "#04346D", fontWeight: 600 }}>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-1 text-lg" style={{ color: plan.highlight ? "#F5F3EB" : "#04346D", fontWeight: 700 }}>{plan.name}</h3>
                  <p className="text-sm mb-4" style={{ color: plan.highlight ? "rgba(245,243,235,0.6)" : "rgba(4,52,109,0.6)" }}>{plan.desc}</p>
                  <div className="flex items-end gap-1">
                    <span style={{ color: plan.highlight ? "#F5F3EB" : "#04346D", fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>{plan.price}€</span>
                    <span className="text-sm mb-1" style={{ color: plan.highlight ? "rgba(245,243,235,0.5)" : "rgba(4,52,109,0.4)" }}>{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: plan.highlight ? "rgba(245,243,235,0.8)" : "#04346D" }} />
                      <span style={{ color: plan.highlight ? "rgba(245,243,235,0.85)" : "rgba(4,52,109,0.75)" }}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.name === "Club" ? "/contact" : "/register"}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:opacity-90"
                  style={{
                    background: plan.highlight ? "#F5F3EB" : "#04346D",
                    color: plan.highlight ? "#04346D" : "#F5F3EB",
                    fontWeight: 600,
                  }}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* Annual note */}
          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: "rgba(4,52,109,0.6)" }}>
              💡 Économisez <strong style={{ color: "#04346D" }}>20%</strong> avec l'abonnement annuel — contactez-nous pour en bénéficier.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t" style={{ borderColor: "rgba(4,52,109,0.06)", background: "white" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ color: "#04346D", fontSize: "1.8rem", fontWeight: 700 }}>Questions fréquentes</h2>
          </div>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl p-6" style={{ background: "#F5F3EB", border: "1px solid rgba(4,52,109,0.06)" }}>
                <h4 className="mb-2 text-sm" style={{ color: "#04346D", fontWeight: 600 }}>{faq.q}</h4>
                <p className="text-sm" style={{ color: "rgba(4,52,109,0.65)", lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 text-center" style={{ background: "#04346D" }}>
        <div className="max-w-xl mx-auto px-6">
          <h2 className="mb-4" style={{ color: "#F5F3EB", fontSize: "1.8rem", fontWeight: 700 }}>
            Encore des questions ?
          </h2>
          <p className="mb-7 text-sm" style={{ color: "rgba(245,243,235,0.6)" }}>
            Notre équipe est disponible pour vous aider à choisir le bon plan pour votre club.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm transition-all hover:opacity-90"
            style={{ background: "#F5F3EB", color: "#04346D", fontWeight: 600 }}
          >
            Nous contacter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
