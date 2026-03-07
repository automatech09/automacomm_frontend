import { useState } from "react";
import { CreditCard, Building2, Users, Trash2, CheckCircle, Crown, UserPlus, X, Pencil, AlertTriangle, ChevronRight } from "lucide-react";

const plans = [
  { name: "Starter", price: "19€/mois", current: false },
  { name: "Pro", price: "39€/mois", current: true },
  { name: "Club", price: "79€/mois", current: false },
];

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Éditeur" | "Lecteur";
  initials: string;
}

const initialMembers: TeamMember[] = [
  { id: 1, name: "Jean Dupont", email: "jean@fcbeaumont.fr", role: "Admin", initials: "JD" },
  { id: 2, name: "Marie Leroy", email: "marie@fcbeaumont.fr", role: "Éditeur", initials: "ML" },
  { id: 3, name: "Paul Morin", email: "paul@fcbeaumont.fr", role: "Lecteur", initials: "PM" },
];

const roleColors: Record<string, { bg: string; color: string }> = {
  "Admin": { bg: "rgba(4,52,109,0.1)", color: "#04346D" },
  "Éditeur": { bg: "rgba(15,155,88,0.1)", color: "#0F9B58" },
  "Lecteur": { bg: "rgba(212,100,10,0.1)", color: "#D4640A" },
};

function SectionTitle({ icon: Icon, title, desc }: { icon: typeof CreditCard; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#04346D" }}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <h2 style={{ color: "#04346D", fontWeight: 700 }}>{title}</h2>
        <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.5)" }}>{desc}</p>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const [clubForm, setClubForm] = useState({
    name: "FC Beaumont",
    city: "Beaumont",
    postalCode: "63110",
    website: "www.fcbeaumont.fr",
    sport: "Football",
    email: "contact@fcbeaumont.fr",
  });
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [showInvite, setShowInvite] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [savedClub, setSavedClub] = useState(false);

  const handleSaveClub = () => {
    setSavedClub(true);
    setTimeout(() => setSavedClub(false), 2500);
  };

  const removeM = (id: number) => setMembers(members.filter((m) => m.id !== id));

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Paramètres</h1>
        <p className="mt-1 text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>
          Gérez votre abonnement, votre club et les accès utilisateurs.
        </p>
      </div>

      {/* ── Abonnement ── */}
      <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
        <SectionTitle icon={CreditCard} title="Gestion de l'abonnement" desc="Plan actuel et facturation" />

        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-4 transition-all"
              style={{
                background: plan.current ? "#04346D" : "rgba(4,52,109,0.03)",
                border: `1.5px solid ${plan.current ? "#04346D" : "rgba(4,52,109,0.1)"}`,
              }}
            >
              {plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs" style={{ background: "#F5F3EB", color: "#04346D", fontWeight: 700 }}>
                    <Crown className="w-3 h-3" />
                    Actuel
                  </span>
                </div>
              )}
              <p className="text-sm" style={{ color: plan.current ? "white" : "#04346D", fontWeight: 700 }}>{plan.name}</p>
              <p className="text-xs mt-0.5" style={{ color: plan.current ? "rgba(245,243,235,0.65)" : "rgba(4,52,109,0.45)" }}>{plan.price}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: "rgba(4,52,109,0.03)", border: "1px solid rgba(4,52,109,0.07)" }}>
          <div>
            <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Plan Pro — Actif</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.5)" }}>Prochain renouvellement le 1 avril 2026 · 39€</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl text-xs transition-all hover:opacity-80" style={{ background: "rgba(4,52,109,0.07)", color: "#04346D", fontWeight: 500 }}>
              Changer de plan
            </button>
            <button className="px-4 py-2 rounded-xl text-xs transition-all hover:opacity-80" style={{ background: "rgba(4,52,109,0.07)", color: "#04346D", fontWeight: 500 }}>
              Factures
            </button>
          </div>
        </div>
      </div>

      {/* ── Informations du club ── */}
      <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
        <SectionTitle icon={Building2} title="Informations du club" desc="Nom, ville, coordonnées" />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "rgba(4,52,109,0.6)", fontWeight: 500 }}>Nom du club</label>
            <input
              value={clubForm.name}
              onChange={(e) => setClubForm({ ...clubForm, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D" }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "rgba(4,52,109,0.6)", fontWeight: 500 }}>Sport</label>
            <select
              value={clubForm.sport}
              onChange={(e) => setClubForm({ ...clubForm, sport: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D" }}
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
            <label className="block text-xs mb-1.5" style={{ color: "rgba(4,52,109,0.6)", fontWeight: 500 }}>Ville</label>
            <input
              value={clubForm.city}
              onChange={(e) => setClubForm({ ...clubForm, city: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D" }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "rgba(4,52,109,0.6)", fontWeight: 500 }}>Code postal</label>
            <input
              value={clubForm.postalCode}
              onChange={(e) => setClubForm({ ...clubForm, postalCode: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D" }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "rgba(4,52,109,0.6)", fontWeight: 500 }}>Email de contact</label>
            <input
              type="email"
              value={clubForm.email}
              onChange={(e) => setClubForm({ ...clubForm, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D" }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "rgba(4,52,109,0.6)", fontWeight: 500 }}>Site web (optionnel)</label>
            <input
              value={clubForm.website}
              onChange={(e) => setClubForm({ ...clubForm, website: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={handleSaveClub}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
            style={{ background: "#04346D", fontWeight: 600 }}
          >
            {savedClub ? <CheckCircle className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
            {savedClub ? "Enregistré !" : "Sauvegarder"}
          </button>
        </div>
      </div>

      {/* ── Utilisateurs ── */}
      

      {/* ── Danger zone ── */}
      <div className="rounded-2xl p-6" style={{ background: "white", border: "1.5px solid rgba(239,68,68,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.1)" }}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <h2 style={{ color: "#DC2626", fontWeight: 700 }}>Zone de danger</h2>
            <p className="text-xs mt-0.5" style={{ color: "rgba(239,68,68,0.6)" }}>Ces actions sont irréversibles</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}>
          <div>
            <p className="text-sm" style={{ color: "#DC2626", fontWeight: 600 }}>Supprimer le compte</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(239,68,68,0.65)", lineHeight: 1.5 }}>
              Supprime définitivement le compte, toutes vos données, templates et publications.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs transition-all hover:opacity-80 ml-4"
            style={{ background: "rgba(239,68,68,0.1)", color: "#DC2626", fontWeight: 600, border: "1.5px solid rgba(239,68,68,0.2)" }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Supprimer
          </button>
        </div>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(4,52,109,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "white" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: "#04346D", fontWeight: 700 }}>Inviter un utilisateur</h3>
              <button onClick={() => setShowInvite(false)} style={{ color: "rgba(4,52,109,0.4)" }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Adresse email</label>
                <input type="email" placeholder="prenom@fcmonclub.fr" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }} />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Rôle</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}>
                  <option>Éditeur</option>
                  <option>Lecteur</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowInvite(false)} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}>Annuler</button>
              <button onClick={() => setShowInvite(false)} className="flex-1 py-3 rounded-xl text-sm text-white" style={{ background: "#04346D", fontWeight: 600 }}>Envoyer l'invitation</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(4,52,109,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "white" }}>
            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(239,68,68,0.1)" }}>
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h3 style={{ color: "#DC2626", fontWeight: 700 }}>Supprimer le compte ?</h3>
              <p className="text-sm mt-2" style={{ color: "rgba(4,52,109,0.6)", lineHeight: 1.6 }}>
                Cette action est <strong style={{ color: "#DC2626" }}>irréversible</strong>. Toutes vos données (équipes, templates, publications, arrière-plans) seront définitivement supprimées.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 rounded-xl text-sm" style={{ background: "#04346D", color: "white", fontWeight: 600 }}>Annuler</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 rounded-xl text-sm text-white" style={{ background: "#DC2626", fontWeight: 600 }}>Supprimer définitivement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
