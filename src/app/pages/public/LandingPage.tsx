import { Link } from "react-router";
import { Zap, Instagram, Facebook, Trophy, Calendar, Image, Clock, CheckCircle, ArrowRight, Play, Star } from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1762445964939-123200d655ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwbmlnaHQlMjBsaWdodHN8ZW58MXx8fHwxNzcyMzc4NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const teamImg = "https://images.unsplash.com/photo-1758470476264-bf1cf2b6ea66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNwb3J0cyUyMGNsdWIlMjB0ZWFtJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzcyMzc4NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const socialImg = "https://images.unsplash.com/photo-1759215524600-7971d6a4dac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnQlMjBjcmVhdG9yJTIwcGhvbmV8ZW58MXx8fHwxNzcyMzc4NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080";

const features = [
  {
    icon: Trophy,
    title: "Résultats automatiques",
    desc: "Les résultats de vos matchs sont récupérés automatiquement et transformés en visuels prêts à publier.",
  },
  {
    icon: Calendar,
    title: "Planification intelligente",
    desc: "Programmez une fois, publiez toujours. Le système s'adapte à votre calendrier sportif chaque semaine.",
  },
  {
    icon: Image,
    title: "Visuels personnalisés",
    desc: "Créez des templates aux couleurs de votre club. Chaque publication reflète votre identité visuelle.",
  },
  {
    icon: Instagram,
    title: "Publication directe",
    desc: "Connectez Instagram et Facebook, AutoMaComm publie directement sur vos réseaux sociaux.",
  },
  {
    icon: Clock,
    title: "Gain de temps radical",
    desc: "Fini les heures passées sur Canva. En 5 minutes, votre communication sportive est gérée pour la semaine.",
  },
  {
    icon: Zap,
    title: "Sans compétences requises",
    desc: "Interface pensée pour tous les bénévoles, peu importe leur niveau. Aucune formation nécessaire.",
  },
];

const steps = [
  { num: "01", title: "Créez votre club", desc: "Renseignez vos équipes, vos couleurs et connectez vos réseaux sociaux en quelques minutes." },
  { num: "02", title: "Définissez vos templates", desc: "Personnalisez vos modèles de visuels pour chaque type de contenu : résultat, affiche, classement." },
  { num: "03", title: "Activez l'automatisation", desc: "Programmez vos publications et laissez AutoMaComm gérer le reste. C'est tout !" },
];

const testimonials = [
  { name: "Marc Lefebvre", role: "Président — FC Bergerac", text: "On gagnait 3h par semaine sur notre communication. Maintenant c'est 0 minute, tout est automatique.", stars: 5 },
  { name: "Sophie Renard", role: "Community Manager — AS Moirans", text: "L'interface est tellement simple que même notre secrétaire bénévole peut gérer les publications.", stars: 5 },
  { name: "Karim Benali", role: "Dirigeant — USL Dunkerque B", text: "Nos supporters adorent la régularité de nos posts. L'image du club a vraiment changé.", stars: 5 },
];

export function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: "#04346D" }}>
        {/* Background image */}
        <div className="absolute inset-0 opacity-15">
          <img src={heroImg} alt="Stadium" className="w-full h-full object-cover" />
        </div>
        {/* Gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #04346D 60%, #0A5EBF 100%)" }} />
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 50%, #F5F3EB 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs" style={{ background: "rgba(245,243,235,0.15)", color: "rgba(245,243,235,0.9)", border: "1px solid rgba(245,243,235,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Déjà 500+ clubs utilisateurs
            </div>

            <h1 className="mb-6" style={{ color: "#F5F3EB", fontSize: "3rem", fontWeight: 800, lineHeight: 1.15 }}>
              La communication<br />
              <span style={{ color: "rgba(245,243,235,0.6)" }}>de votre club,</span><br />
              en automatique.
            </h1>

            <p className="text-lg mb-10" style={{ color: "rgba(245,243,235,0.7)", lineHeight: 1.7 }}>
              AutoMaComm récupère vos résultats, crée vos visuels et publie automatiquement sur Instagram et Facebook. Zéro effort, résultat professionnel.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm transition-all hover:opacity-90"
                style={{ background: "#F5F3EB", color: "#04346D", fontWeight: 600 }}
              >
                Démarrer gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm transition-all hover:opacity-80" style={{ border: "1px solid rgba(245,243,235,0.3)", color: "rgba(245,243,235,0.85)" }}>
                <Play className="w-4 h-4" />
                Voir la démo
              </button>
            </div>

            <p className="mt-5 text-xs" style={{ color: "rgba(245,243,235,0.4)" }}>
              14 jours d'essai gratuit · Aucune carte requise · Annulation à tout moment
            </p>
          </div>

          {/* Hero card mockup */}
          <div className="hidden md:block relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
              <img src={teamImg} alt="Club" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,52,109,0.9) 0%, transparent 50%)" }} />

              {/* Floating cards */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3">
                <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "rgba(245,243,235,0.95)", backdropFilter: "blur(10px)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#04346D" }}>
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#04346D", fontWeight: 600 }}>Visuel généré automatiquement</p>
                    <p className="text-xs" style={{ color: "rgba(4,52,109,0.6)" }}>FC Beaumont 3 — 1 AS Millery</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.15)", color: "rgb(22,163,74)" }}>Publié ✓</span>
                  </div>
                </div>

                <div className="rounded-xl px-3 py-2 flex items-center gap-2" style={{ background: "rgba(4,52,109,0.8)", backdropFilter: "blur(10px)" }}>
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <Facebook className="w-3.5 h-3.5 text-blue-400" />
                  <p className="text-xs" style={{ color: "rgba(245,243,235,0.8)" }}>Publication automatique dans 2h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 border-b" style={{ background: "white", borderColor: "rgba(4,52,109,0.08)" }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Clubs utilisateurs" },
            { value: "12 000+", label: "Visuels générés" },
            { value: "98%", label: "Satisfaction client" },
            { value: "3h/sem", label: "Économisées en moyenne" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl mb-1" style={{ color: "#04346D", fontWeight: 800 }}>{stat.value}</p>
              <p className="text-sm" style={{ color: "rgba(4,52,109,0.6)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24" style={{ background: "#F5F3EB" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4" style={{ background: "rgba(4,52,109,0.08)", color: "#04346D" }}>Fonctionnalités</span>
            <h2 style={{ color: "#04346D", fontSize: "2.2rem", fontWeight: 700 }}>
              Tout ce dont votre club a besoin
            </h2>
            <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: "rgba(4,52,109,0.6)" }}>
              Une seule plateforme pour gérer l'intégralité de votre communication sportive sur les réseaux sociaux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl transition-all hover:shadow-md group" style={{ background: "white", border: "1px solid rgba(4,52,109,0.06)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-105" style={{ background: "rgba(4,52,109,0.06)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#04346D" }} />
                </div>
                <h3 className="mb-2" style={{ color: "#04346D", fontWeight: 600, fontSize: "1rem" }}>{title}</h3>
                <p className="text-sm" style={{ color: "rgba(4,52,109,0.6)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-y" style={{ background: "white", borderColor: "rgba(4,52,109,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4" style={{ background: "rgba(4,52,109,0.08)", color: "#04346D" }}>Comment ça marche</span>
              <h2 className="mb-4" style={{ color: "#04346D", fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.2 }}>
                3 étapes pour automatiser votre comm'
              </h2>
              <p className="mb-8 text-base" style={{ color: "rgba(4,52,109,0.6)" }}>
                Configurer AutoMaComm prend moins de 15 minutes. Ensuite, tout fonctionne seul, semaine après semaine.
              </p>
              <div className="space-y-6">
                {steps.map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm" style={{ background: "#04346D", color: "#F5F3EB", fontWeight: 700 }}>
                      {step.num}
                    </div>
                    <div>
                      <h4 className="mb-1" style={{ color: "#04346D", fontWeight: 600 }}>{step.title}</h4>
                      <p className="text-sm" style={{ color: "rgba(4,52,109,0.6)", lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-sm text-white transition-all hover:opacity-90"
                style={{ background: "#04346D" }}
              >
                Commencer maintenant
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "3/4" }}>
              <img src={socialImg} alt="Social media" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,52,109,0.7) 0%, transparent 40%)" }} />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl p-4" style={{ background: "rgba(245,243,235,0.95)", backdropFilter: "blur(10px)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>3 publications planifiées cette semaine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-pink-500" />
                  <Facebook className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs" style={{ color: "rgba(4,52,109,0.6)" }}>Publication automatique activée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ background: "#F5F3EB" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4" style={{ background: "rgba(4,52,109,0.08)", color: "#04346D" }}>Témoignages</span>
            <h2 style={{ color: "#04346D", fontSize: "2.2rem", fontWeight: 700 }}>Ils font confiance à AutoMaComm</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl" style={{ background: "white", border: "1px solid rgba(4,52,109,0.06)" }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-5" style={{ color: "rgba(4,52,109,0.7)", lineHeight: 1.7 }}>"{t.text}"</p>
                <div>
                  <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "rgba(4,52,109,0.5)" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#04346D" }}>
        <div className="absolute inset-0 opacity-5">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="mb-5" style={{ color: "#F5F3EB", fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.2 }}>
            Prêt à automatiser la communication de votre club ?
          </h2>
          <p className="mb-8 text-base" style={{ color: "rgba(245,243,235,0.65)" }}>
            Rejoignez les 500+ clubs qui ont repris du temps grâce à AutoMaComm. Commencez votre essai gratuit de 14 jours dès aujourd'hui.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm transition-all hover:opacity-90"
              style={{ background: "#F5F3EB", color: "#04346D", fontWeight: 600 }}
            >
              Démarrer gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="px-7 py-3.5 rounded-xl text-sm transition-all hover:opacity-80"
              style={{ border: "1px solid rgba(245,243,235,0.3)", color: "rgba(245,243,235,0.85)" }}
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}