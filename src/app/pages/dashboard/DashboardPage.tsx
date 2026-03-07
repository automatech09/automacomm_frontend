import { Trophy, Calendar, Clock, Instagram, Facebook, CheckCircle, Zap, TrendingUp, Eye, Palette } from "lucide-react";
import { useState } from "react";

// Configuration des couleurs d'équipes (modifiable)
const teamColors = {
  "Équipe 1": { bg: "#FFE8E0", text: "#FF6B35", border: "#FF6B35" },
  "U18": { bg: "#E0F5EA", text: "#0F9B58", border: "#0F9B58" },
  "Réserve": { bg: "#EBE0FF", text: "#7A0FB0", border: "#7A0FB0" },
};

// Couleur unique pour tous les types de visuels (bleu marine principal + beige secondaire)
const visualTypeColor = {
  bg: "#04346D",
  text: "#F5F3EB",
};

const upcomingPublications = [
  { id: 1, date: "Lun 3 mars", time: "18:00", team: "Équipe 1", type: "Résultat", network: "instagram" },
  { id: 2, date: "Mar 4 mars", time: "09:00", team: "U18", type: "Classement", network: "facebook" },
  { id: 3, date: "Mer 5 mars", time: "17:00", team: "Réserve", type: "Affiche", network: "instagram" },
  { id: 4, date: "Ven 7 mars", time: "10:00", team: "Équipe 1", type: "Affiche", network: "both" },
  { id: 5, date: "Sam 8 mars", time: "08:00", team: "Équipe 1", type: "Résultat", network: "instagram" },
  { id: 6, date: "Sam 8 mars", time: "18:00", team: "U18", type: "Résultat", network: "facebook" },
  { id: 7, date: "Dim 9 mars", time: "20:00", team: "Réserve", type: "Résultat", network: "both" },
];

export function DashboardPage() {
  const [teams, setTeams] = useState(teamColors);
  const [editingTeam, setEditingTeam] = useState<string | null>(null);

  const handleColorChange = (teamName: string, newColor: string) => {
    setTeams(prev => ({
      ...prev,
      [teamName]: {
        bg: newColor + "33", // 33 = 20% opacity in hex
        text: newColor,
        border: newColor,
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Bonjour, Jean 👋</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(4,52,109,0.55)" }}>
            Voici un résumé de la semaine pour <strong style={{ color: "#04346D" }}>FC Beaumont</strong>
          </p>
        </div>
        <div className="flex items-center gap-2">
          
        </div>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Publications cette semaine */}
        <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(4,52,109,0.06)" }}>
                <Calendar className="w-4 h-4" style={{ color: "#04346D" }} />
              </div>
              <span className="text-xs uppercase tracking-wide" style={{ color: "rgba(4,52,109,0.5)", fontWeight: 600 }}>Cette semaine</span>
            </div>
          </div>
          <div className="py-3">
            <div className="text-center mb-4">
              <p className="text-5xl mb-1" style={{ color: "#04346D", fontWeight: 800 }}>7</p>
              <p className="text-xs" style={{ color: "rgba(4,52,109,0.5)" }}>Publications programmées</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1.5 px-3 rounded-lg" style={{ background: "rgba(4,52,109,0.03)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: visualTypeColor.bg, color: visualTypeColor.text, fontWeight: 600 }}>Résultat</span>
                </div>
                <span className="text-xs" style={{ color: "#04346D", fontWeight: 600 }}>3</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-3 rounded-lg" style={{ background: "rgba(4,52,109,0.03)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: visualTypeColor.bg, color: visualTypeColor.text, fontWeight: 600 }}>Affiche</span>
                </div>
                <span className="text-xs" style={{ color: "#04346D", fontWeight: 600 }}>2</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-3 rounded-lg" style={{ background: "rgba(4,52,109,0.03)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: visualTypeColor.bg, color: visualTypeColor.text, fontWeight: 600 }}>Classement</span>
                </div>
                <span className="text-xs" style={{ color: "#04346D", fontWeight: 600 }}>2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dernière publication */}
        <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(15,155,88,0.1)" }}>
                <CheckCircle className="w-4 h-4" style={{ color: "#0F9B58" }} />
              </div>
              <span className="text-xs uppercase tracking-wide" style={{ color: "rgba(4,52,109,0.5)", fontWeight: 600 }}>Dernière publication</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(15,155,88,0.1)", color: "#0F9B58", fontWeight: 600 }}>Publié</span>
          </div>
          <div className="py-2 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2.5 py-1 rounded-full shadow-sm" style={{ background: visualTypeColor.bg, color: visualTypeColor.text, fontWeight: 600 }}>
                Résultat
              </span>
              <span 
                className="text-xs px-3 py-1.5 rounded-md shadow-sm" 
                style={{ 
                  background: "#F8F9FA", 
                  color: "#04346D", 
                  fontWeight: 600,
                  borderLeft: `3px solid ${teams["Réserve"].text}`,
                  boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                }}
              >
                Réserve
              </span>
            </div>
            <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Dim 2 mars à 20h00</p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span className="text-xs" style={{ color: "rgba(4,52,109,0.5)" }}>Instagram</span>
              </div>
            </div>
            <div className="pt-2 mt-2" style={{ borderTop: "1px solid rgba(4,52,109,0.07)" }}>
              <div className="rounded-lg overflow-hidden" style={{ aspectRatio: "1/1", background: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)", position: "relative" }}>
                {/* Preview mockup de la publication */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="text-center">
                    <Trophy className="w-10 h-10 text-white/80 mx-auto mb-3" />
                    <p className="text-white text-xl mb-1" style={{ fontWeight: 800 }}>3 - 1</p>
                    <p className="text-white/70 text-xs">Résultat du match</p>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <Instagram className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prochaine publication */}
        <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "#04346D" }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: "#F5F3EB", transform: "translate(30%, -30%)" }} />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,243,235,0.15)" }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs uppercase tracking-wide" style={{ color: "rgba(245,243,235,0.6)", fontWeight: 600 }}>Prochaine publication</span>
            </div>
          </div>
          <div className="py-2 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2.5 py-1 rounded-full shadow-sm" style={{ background: visualTypeColor.bg, color: visualTypeColor.text, fontWeight: 600 }}>
                Affiche match
              </span>
              <span 
                className="text-xs px-3 py-1.5 rounded-md shadow-sm" 
                style={{ 
                  background: "white", 
                  color: "#04346D", 
                  fontWeight: 600,
                  borderLeft: `3px solid ${teams["Équipe 1"].text}`,
                  boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                }}
              >
                Équipe 1
              </span>
            </div>
            <p className="text-white text-sm" style={{ fontWeight: 600 }}>Lundi 3 mars à 18h00</p>
          </div>
          <div className="mt-3 flex items-center gap-2 mb-3">
            <Instagram className="w-4 h-4 text-pink-300" />
            <span className="text-xs" style={{ color: "rgba(245,243,235,0.6)" }}>Instagram — Post carré</span>
          </div>
          <div className="pt-2 mt-2" style={{ borderTop: "1px solid rgba(245,243,235,0.15)" }}>
            <div className="rounded-lg overflow-hidden" style={{ aspectRatio: "1/1", background: "linear-gradient(135deg, #FF6B35 0%, #D4640A 100%)", position: "relative" }}>
              {/* Preview mockup de l'affiche match */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-2">
                  <p className="text-white/80 text-xs uppercase tracking-wider" style={{ fontWeight: 700 }}>Prochain match</p>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-white text-sm" style={{ fontWeight: 600 }}>FC Beaumont</p>
                    </div>
                    <div className="text-white text-lg" style={{ fontWeight: 800 }}>VS</div>
                    <div className="text-center">
                      <p className="text-white text-sm" style={{ fontWeight: 600 }}>St-Priest FC</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Clock className="w-4 h-4 text-white/70 mx-auto mb-1" />
                    <p className="text-white/70 text-xs">Dim. 8 mars — 15h00</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Instagram className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      

      {/* Timeline */}
      <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: "white", border: "1px solid rgba(4,52,109,0.08)" }}>
        <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ background: "linear-gradient(to right, rgba(4,52,109,0.02), transparent)", borderColor: "rgba(4,52,109,0.08)" }}>
          <div>
            <h2 className="text-base" style={{ color: "#04346D", fontWeight: 600 }}>Publications à venir</h2>
            <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.45)" }}>7 prochains jours — 7 publications planifiées</p>
          </div>
          <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:scale-105 shadow-sm" style={{ background: "linear-gradient(135deg, rgba(4,52,109,0.06), rgba(4,52,109,0.03))", color: "#04346D", fontWeight: 600 }}>
            Voir tout
          </button>
        </div>

        {/* Column headers */}
        

        <div className="divide-y" style={{ "--tw-divide-color": "rgba(4,52,109,0.06)" } as React.CSSProperties}>
          {upcomingPublications.map((pub, index) => {
            const teamColor = teams[pub.team as keyof typeof teams];
            return (
            <div 
              key={pub.id} 
              className="px-5 py-2.5 flex items-center gap-3 transition-all"
              style={{ 
                background: "white",
                borderLeft: "3px solid transparent"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(4,52,109,0.04)";
                e.currentTarget.style.borderLeftColor = "#04346D";
                e.currentTarget.style.transform = "translateX(2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.borderLeftColor = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {/* Date/time */}
              <div className="w-20 flex-shrink-0">
                <p className="text-xs leading-tight" style={{ color: "#04346D", fontWeight: 700 }}>{pub.date}</p>
                <p className="text-xs" style={{ color: "rgba(4,52,109,0.4)", fontWeight: 500 }}>{pub.time}</p>
              </div>

              {/* Type badge */}
              <div className="w-24 flex-shrink-0">
                <span className="text-xs px-2.5 py-1 rounded-full shadow-sm inline-block" style={{ background: visualTypeColor.bg, color: visualTypeColor.text, fontWeight: 600 }}>
                  {pub.type}
                </span>
              </div>

              {/* Team with color picker - Modern design */}
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span 
                  className="text-xs px-3 py-1.5 rounded-md inline-flex items-center gap-2 group relative"
                  style={{ 
                    background: "#F8F9FA", 
                    color: "#04346D", 
                    fontWeight: 600,
                    borderLeft: `3px solid ${teamColor.text}`,
                    boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                  }}
                >
                  {pub.team}
                  <button
                    onClick={() => setEditingTeam(editingTeam === pub.team ? null : pub.team)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Palette className="w-3 h-3" />
                  </button>
                </span>
                {editingTeam === pub.team && (
                  <div className="absolute z-10 flex gap-1 p-2 rounded-lg shadow-lg" style={{ background: "white", border: "1px solid rgba(4,52,109,0.1)", marginLeft: "120px" }}>
                    {["#FF6B35", "#0F9B58", "#7A0FB0", "#0A5EBF", "#D4640A", "#E91E63"].map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          handleColorChange(pub.team, color);
                          setEditingTeam(null);
                        }}
                        className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                        style={{ 
                          background: color,
                          borderColor: teamColor.text === color ? "#04346D" : "transparent"
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Network */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {(pub.network === "instagram" || pub.network === "both") && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm transition-transform hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(219,39,119,0.15), rgba(219,39,119,0.08))" }}>
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  </div>
                )}
                {(pub.network === "facebook" || pub.network === "both") && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm transition-transform hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(37,99,235,0.08))" }}>
                    <Facebook className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                )}
              </div>

              {/* Thumbnail placeholder */}
              
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}