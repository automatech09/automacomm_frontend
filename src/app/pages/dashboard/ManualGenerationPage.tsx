import { useState } from "react";
import {
  Wand2,
  Download,
  Send,
  Trophy,
  Calendar,
  BarChart2,
  Layout,
  ChevronDown,
  RefreshCw,
  Instagram,
  Facebook,
  Zap,
  ArrowLeft,
  Grid3x3,
} from "lucide-react";

type VisualType = "Résultat" | "Affiche" | "Classement" | "Calendrier";
type TeamName = "Équipe 1" | "Réserve" | "U18";

interface Template {
  id: string;
  name: string;
  type: VisualType;
  team: TeamName;
  gradient: string;
}

const visualTypes: { type: VisualType; icon: typeof Trophy; gradient: string; desc: string }[] = [
  { type: "Résultat", icon: Trophy, gradient: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)", desc: "Score final du match" },
  { type: "Affiche", icon: Layout, gradient: "linear-gradient(135deg, #FF6B35 0%, #D4640A 100%)", desc: "Annonce d'un match" },
  { type: "Classement", icon: BarChart2, gradient: "linear-gradient(135deg, #D4640A 0%, #F5A623 100%)", desc: "Tableau du championnat" },
  { type: "Calendrier", icon: Calendar, gradient: "linear-gradient(135deg, #0F9B58 0%, #04346D 100%)", desc: "Prochains matchs" },
];

// Templates mockup organisés par équipe
const templatesByTeam: Record<TeamName, Template[]> = {
  "Équipe 1": [
    { id: "eq1-res-1", name: "Résultat Standard", type: "Résultat", team: "Équipe 1", gradient: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)" },
    { id: "eq1-res-2", name: "Résultat Minimal", type: "Résultat", team: "Équipe 1", gradient: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)" },
    { id: "eq1-aff-1", name: "Affiche Match", type: "Affiche", team: "Équipe 1", gradient: "linear-gradient(135deg, #FF6B35 0%, #D4640A 100%)" },
    { id: "eq1-aff-2", name: "Affiche Domicile", type: "Affiche", team: "Équipe 1", gradient: "linear-gradient(135deg, #FF6B35 0%, #D4640A 100%)" },
    { id: "eq1-class-1", name: "Classement Complet", type: "Classement", team: "Équipe 1", gradient: "linear-gradient(135deg, #D4640A 0%, #F5A623 100%)" },
    { id: "eq1-cal-1", name: "Calendrier Semaine", type: "Calendrier", team: "Équipe 1", gradient: "linear-gradient(135deg, #0F9B58 0%, #04346D 100%)" },
  ],
  "Réserve": [
    { id: "res-res-1", name: "Résultat Standard", type: "Résultat", team: "Réserve", gradient: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)" },
    { id: "res-aff-1", name: "Affiche Match", type: "Affiche", team: "Réserve", gradient: "linear-gradient(135deg, #FF6B35 0%, #D4640A 100%)" },
    { id: "res-class-1", name: "Classement Complet", type: "Classement", team: "Réserve", gradient: "linear-gradient(135deg, #D4640A 0%, #F5A623 100%)" },
    { id: "res-cal-1", name: "Calendrier Mois", type: "Calendrier", team: "Réserve", gradient: "linear-gradient(135deg, #0F9B58 0%, #04346D 100%)" },
  ],
  "U18": [
    { id: "u18-res-1", name: "Résultat Jeunes", type: "Résultat", team: "U18", gradient: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)" },
    { id: "u18-res-2", name: "Résultat Coloré", type: "Résultat", team: "U18", gradient: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)" },
    { id: "u18-aff-1", name: "Affiche Match", type: "Affiche", team: "U18", gradient: "linear-gradient(135deg, #FF6B35 0%, #D4640A 100%)" },
    { id: "u18-class-1", name: "Classement U18", type: "Classement", team: "U18", gradient: "linear-gradient(135deg, #D4640A 0%, #F5A623 100%)" },
    { id: "u18-cal-1", name: "Calendrier Complet", type: "Calendrier", team: "U18", gradient: "linear-gradient(135deg, #0F9B58 0%, #04346D 100%)" },
  ],
};

const teamColors: Record<TeamName, { bg: string; text: string; border: string }> = {
  "Équipe 1": { bg: "#FFE8E0", text: "#FF6B35", border: "#FF6B35" },
  "Réserve": { bg: "#EBE0FF", text: "#7A0FB0", border: "#7A0FB0" },
  "U18": { bg: "#E0F5EA", text: "#0F9B58", border: "#0F9B58" },
};

export function ManualGenerationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeTeam, setActiveTeam] = useState<TeamName | "Tous">("Tous");
  
  const [form, setForm] = useState({
    team: "Équipe 1",
    opponent: "AS Millery",
    scoreHome: "3",
    scoreAway: "1",
    date: "2026-03-08",
    time: "15:00",
    location: "Stade Léo Lagrange",
    competition: "Division Régionale 1",
    network: "both",
  });
  const [generated, setGenerated] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      setTimeout(() => setPublished(false), 3000);
    }, 1500);
  };

  const getTemplateIcon = (type: VisualType) => {
    const visualType = visualTypes.find(v => v.type === type);
    return visualType?.icon || Trophy;
  };

  // Filtrer les templates selon l'équipe active
  const allTemplates = Object.values(templatesByTeam).flat();
  const filteredTemplates = activeTeam === "Tous" 
    ? allTemplates 
    : templatesByTeam[activeTeam];

  // STEP 1: Template Selection Grid
  if (!selectedTemplate) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Génération manuelle</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>
            Sélectionnez un template pour créer votre visuel personnalisé.
          </p>
        </div>

        {/* Team Tabs */}
        <div className="flex items-center gap-2 border-b pb-0" style={{ borderColor: "rgba(4,52,109,0.1)" }}>
          <button
            key="Tous"
            onClick={() => setActiveTeam("Tous")}
            className="px-5 py-3 text-sm font-medium transition-all relative"
            style={{
              color: activeTeam === "Tous" ? "#FF6B35" : "rgba(4,52,109,0.5)",
              fontWeight: activeTeam === "Tous" ? 600 : 500,
            }}
          >
            Tous
            {activeTeam === "Tous" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "#FF6B35" }}
              />
            )}
          </button>
          {(Object.keys(templatesByTeam) as TeamName[]).map((team) => {
            const isActive = activeTeam === team;
            const color = teamColors[team];
            return (
              <button
                key={team}
                onClick={() => setActiveTeam(team)}
                className="px-5 py-3 text-sm font-medium transition-all relative"
                style={{
                  color: isActive ? color.text : "rgba(4,52,109,0.5)",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {team}
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: color.text }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTemplates.map((template) => {
            const Icon = getTemplateIcon(template.type);
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className="group rounded-2xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl"
                style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}
              >
                {/* Template Preview */}
                <div
                  className="aspect-square relative overflow-hidden"
                  style={{ background: template.gradient }}
                >
                  {/* Background texture */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 40%)",
                    }}
                  />

                  {/* Mini preview content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="mb-3 px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                      <span className="text-white text-xs" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
                        FC BEAUMONT
                      </span>
                    </div>

                    {template.type === "Résultat" && (
                      <div className="flex items-center gap-3">
                        <span style={{ color: "white", fontSize: "2rem", fontWeight: 900 }}>3</span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.5rem" }}>–</span>
                        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "2rem", fontWeight: 900 }}>1</span>
                      </div>
                    )}

                    {template.type === "Affiche" && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
                        <span className="text-white text-xs opacity-60">VS</span>
                        <div className="w-8 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                      </div>
                    )}

                    {template.type === "Classement" && (
                      <div className="w-full space-y-1">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-2 py-1 rounded"
                            style={{ background: "rgba(255,255,255,0.15)" }}
                          >
                            <span className="text-white text-xs w-3">{i}</span>
                            <div className="flex-1 h-1 rounded" style={{ background: "rgba(255,255,255,0.3)" }} />
                          </div>
                        ))}
                      </div>
                    )}

                    {template.type === "Calendrier" && (
                      <div className="w-full space-y-1">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="px-2 py-1.5 rounded"
                            style={{ background: "rgba(255,255,255,0.15)" }}
                          >
                            <div className="h-1 rounded" style={{ background: "rgba(255,255,255,0.4)" }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-4 py-2 rounded-full" style={{ background: "white" }}>
                      <span className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>
                        Sélectionner
                      </span>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    
                    
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "#04346D",
                        color: "#F5F3EB",
                        fontWeight: 600,
                      }}
                    >
                      {template.type}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "#F8F9FA",
                        color: "#04346D",
                        fontWeight: 600,
                        borderLeft: `3px solid ${teamColors[template.team].text}`,
                        boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                      }}
                    >
                      {template.team}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // STEP 2: Generation Form (existing interface)
  const currentType = visualTypes.find((v) => v.type === selectedTemplate.type)!;

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedTemplate(null)}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all hover:scale-105"
          style={{ background: "rgba(4,52,109,0.06)", color: "#04346D" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>
              {selectedTemplate.name}
            </h1>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: "#04346D",
                color: "#F5F3EB",
                fontWeight: 600,
              }}
            >
              {selectedTemplate.type}
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded"
              style={{
                background: teamColors[selectedTemplate.team].bg,
                color: teamColors[selectedTemplate.team].text,
                fontWeight: 600,
                border: `1px solid ${teamColors[selectedTemplate.team].border}40`,
              }}
            >
              {selectedTemplate.team}
            </span>
          </div>
          <p className="mt-1 text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>
            Créez un visuel personnalisé et publiez-le en quelques secondes.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* LEFT — Preview */}
        <div className="space-y-4">
          {/* Visual Preview */}
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "1", background: selectedTemplate.gradient, position: "relative" }}>
            {/* Background texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 40%)" }} />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              {/* Club name badge */}
              <div className="mb-4 px-4 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
                <span className="text-white text-xs" style={{ fontWeight: 700, letterSpacing: "0.08em" }}>FC BEAUMONT</span>
              </div>

              {selectedTemplate.type === "Résultat" && (
                <>
                  <div className="flex items-center gap-6 mb-3">
                    <div className="text-center">
                      <p className="text-white text-xs mb-1 opacity-70">FC Beaumont</p>
                      <span style={{ color: "white", fontSize: "4rem", fontWeight: 900, lineHeight: 1 }}>{form.scoreHome}</span>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "2rem", fontWeight: 300 }}>–</span>
                    <div className="text-center">
                      <p className="text-white text-xs mb-1 opacity-70">{form.opponent}</p>
                      <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "4rem", fontWeight: 900, lineHeight: 1 }}>{form.scoreAway}</span>
                    </div>
                  </div>
                  <p className="text-white text-xs opacity-60 mt-2">{form.competition}</p>
                </>
              )}

              {selectedTemplate.type === "Affiche" && (
                <>
                  <p className="text-white text-xs opacity-60 mb-3 uppercase tracking-widest">{form.competition}</p>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.4)" }} />
                      <p className="text-white text-sm" style={{ fontWeight: 700 }}>FC Beaumont</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-white opacity-60 text-xs">VS</span>
                    </div>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }} />
                      <p className="text-white text-sm" style={{ fontWeight: 700 }}>{form.opponent}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm opacity-80" style={{ fontWeight: 600 }}>
                      {new Date(form.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                    </p>
                    <p className="text-white text-xs opacity-55 mt-1">{form.time} · {form.location}</p>
                  </div>
                </>
              )}

              {selectedTemplate.type === "Classement" && (
                <div className="w-full max-w-xs space-y-2">
                  {[
                    { rank: 1, name: "FC Beaumont", pts: 45 },
                    { rank: 2, name: "St-Priest FC", pts: 42 },
                    { rank: 3, name: "AS Millery", pts: 38 },
                    { rank: 4, name: "Lyon Sud", pts: 35 },
                  ].map((row) => (
                    <div key={row.rank} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: row.rank === 1 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)" }}>
                      <span className="text-white text-sm w-5" style={{ fontWeight: 700 }}>{row.rank}</span>
                      <span className="flex-1 text-white text-sm" style={{ fontWeight: row.rank === 1 ? 700 : 500 }}>{row.name}</span>
                      <span className="text-white text-sm" style={{ fontWeight: 700 }}>{row.pts} pts</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTemplate.type === "Calendrier" && (
                <div className="w-full max-w-xs space-y-2">
                  {[
                    { date: "8 mars", opponent: "St-Priest FC", location: "Dom." },
                    { date: "15 mars", opponent: "AS Millery", location: "Ext." },
                    { date: "22 mars", opponent: "Lyon Sud", location: "Dom." },
                  ].map((match, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <span className="text-white text-xs w-14" style={{ fontWeight: 700 }}>{match.date}</span>
                      <span className="flex-1 text-white text-xs">{match.opponent}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>{match.location}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Generated stamp */}
            {generated && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(15,155,88,0.85)", color: "white", fontWeight: 600 }}>
                  <Zap className="w-3 h-3" />
                  Généré
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setGenerated(true)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:opacity-90"
              style={{ background: "#04346D", color: "white", fontWeight: 600 }}
            >
              <RefreshCw className="w-4 h-4" />
              Générer
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing || published}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:opacity-90"
              style={{
                background: published ? "rgba(15,155,88,0.1)" : "rgba(4,52,109,0.08)",
                color: published ? "#0F9B58" : "#04346D",
                fontWeight: 600,
                border: `1.5px solid ${published ? "rgba(15,155,88,0.3)" : "rgba(4,52,109,0.12)"}`,
              }}
            >
              {publishing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : published ? (
                <>✓ Publié</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Publier
                </>
              )}
            </button>
            <button
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:opacity-80"
              style={{ background: "rgba(4,52,109,0.06)", color: "#04346D", fontWeight: 600, border: "1.5px solid rgba(4,52,109,0.1)" }}
            >
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(4,52,109,0.06)", background: "rgba(4,52,109,0.02)" }}>
            <h2 style={{ color: "#04346D", fontWeight: 700 }}>Informations du visuel</h2>
            <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.45)" }}>Modifiez les champs pour mettre à jour l'aperçu en temps réel.</p>
          </div>

          <div className="p-6 space-y-5">
            {/* Team */}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Équipe</label>
              <div className="relative">
                <select
                  value={form.team}
                  onChange={(e) => setForm({ ...form, team: e.target.value })}
                  className="w-full appearance-none px-4 py-3 rounded-xl text-sm outline-none pr-10"
                  style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                >
                  <option>Équipe 1</option>
                  <option>Réserve</option>
                  <option>U18</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(4,52,109,0.4)" }} />
              </div>
            </div>

            {/* Opponent */}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Adversaire</label>
              <input
                type="text"
                value={form.opponent}
                onChange={(e) => setForm({ ...form, opponent: e.target.value })}
                placeholder="Ex: AS Millery"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
              />
            </div>

            {/* Score (only for Résultat) */}
            {selectedTemplate.type === "Résultat" && (
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Score final</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={form.scoreHome}
                    onChange={(e) => setForm({ ...form, scoreHome: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none text-center"
                    style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                    min={0}
                    max={99}
                  />
                  <span style={{ color: "rgba(4,52,109,0.3)", fontWeight: 700, fontSize: "1.2rem" }}>–</span>
                  <input
                    type="number"
                    value={form.scoreAway}
                    onChange={(e) => setForm({ ...form, scoreAway: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none text-center"
                    style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                    min={0}
                    max={99}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-1">
                  <span className="text-xs" style={{ color: "rgba(4,52,109,0.4)" }}>FC Beaumont</span>
                  <span className="text-xs" style={{ color: "rgba(4,52,109,0.4)" }}>{form.opponent || "Adversaire"}</span>
                </div>
              </div>
            )}

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Heure</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                />
              </div>
            </div>

            {/* Location */}
            {(selectedTemplate.type === "Affiche" || selectedTemplate.type === "Résultat") && (
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Lieu</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Ex: Stade Municipal"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                />
              </div>
            )}

            {/* Competition */}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Compétition</label>
              <input
                type="text"
                value={form.competition}
                onChange={(e) => setForm({ ...form, competition: e.target.value })}
                placeholder="Ex: Division Régionale 1"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
              />
            </div>

            {/* Network selector */}
            <div>
              <label className="block text-sm mb-2" style={{ color: "#04346D", fontWeight: 500 }}>Publier sur</label>
              <div className="flex gap-2">
                {[
                  { value: "instagram", icon: Instagram, label: "Instagram", iconColor: "#E91E8C" },
                  { value: "facebook", icon: Facebook, label: "Facebook", iconColor: "#1877F2" },
                  { value: "both", icon: Wand2, label: "Les deux", iconColor: "#04346D" },
                ].map(({ value, icon: Icon, label, iconColor }) => (
                  <button
                    key={value}
                    onClick={() => setForm({ ...form, network: value })}
                    className="flex-1 flex flex-col items-center gap-1.5 py-2.5 rounded-xl text-xs transition-all"
                    style={{
                      background: form.network === value ? "#04346D" : "rgba(4,52,109,0.04)",
                      color: form.network === value ? "white" : "rgba(4,52,109,0.6)",
                      border: `1.5px solid ${form.network === value ? "#04346D" : "rgba(4,52,109,0.1)"}`,
                      fontWeight: form.network === value ? 600 : 400,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: form.network === value ? "white" : iconColor }} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(4,52,109,0.06)" }} />

            {/* Main action */}
            <button
              onClick={() => setGenerated(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
              style={{ background: "#04346D", fontWeight: 600 }}
            >
              <Wand2 className="w-4 h-4" />
              Générer le visuel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}