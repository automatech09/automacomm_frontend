import { useState } from "react";
import { Plus, Pencil, Trophy, Calendar, BarChart2, Layout, Eye, Copy, Trash2, Zap, X, Radio, ChevronLeft, Sparkles } from "lucide-react";

type TemplateType = "Résultat" | "Classement" | "Affiche" | "Calendrier";
type TemplateFormat = "Post" | "Story";
type TeamName = "Équipe 1" | "Réserve" | "U18";

interface Template {
  id: number;
  type: TemplateType;
  format: TemplateFormat;
  team: TeamName;
  active: boolean;
  lastUsed?: string;
  gradient: string;
}

const templates: Template[] = [
  { id: 1, type: "Résultat", format: "Post", team: "Équipe 1", active: true, lastUsed: "23 fév.", gradient: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)" },
  { id: 2, type: "Résultat", format: "Post", team: "Équipe 1", active: true, gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" },
  { id: 3, type: "Affiche", format: "Post", team: "Réserve", active: true, lastUsed: "28 fév.", gradient: "linear-gradient(135deg, #04346D 0%, #7A0FB0 100%)" },
  { id: 4, type: "Affiche", format: "Story", team: "Équipe 1", active: true, gradient: "linear-gradient(135deg, #04346D 0%, #0F9B58 100%)" },
  { id: 5, type: "Classement", format: "Post", team: "Équipe 1", active: false, gradient: "linear-gradient(135deg, #D4640A 0%, #F5A623 100%)" },
  { id: 6, type: "Calendrier", format: "Post", team: "Réserve", active: true, gradient: "linear-gradient(135deg, #0F9B58 0%, #04346D 100%)" },
  { id: 7, type: "Résultat", format: "Post", team: "U18", active: true, lastUsed: "1 mars", gradient: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)" },
  { id: 8, type: "Affiche", format: "Post", team: "U18", active: true, gradient: "linear-gradient(135deg, #FF6B35 0%, #D4640A 100%)" },
];

const typeConfig: Record<TemplateType, { icon: typeof Trophy; color: string; bg: string }> = {
  Résultat: { icon: Trophy, color: "#0A5EBF", bg: "#E8F4FF" },
  Classement: { icon: BarChart2, color: "#D4640A", bg: "#FFF3E8" },
  Affiche: { icon: Layout, color: "#7A0FB0", bg: "#F3EEFB" },
  Calendrier: { icon: Radio, color: "#0F9B58", bg: "#EEFBF3" },
};

const teamColors: Record<TeamName, { bg: string; text: string; border: string }> = {
  "Équipe 1": { bg: "#FFE8E0", text: "#FF6B35", border: "#FF6B35" },
  "Réserve": { bg: "#EBE0FF", text: "#7A0FB0", border: "#7A0FB0" },
  "U18": { bg: "#E0F5EA", text: "#0F9B58", border: "#0F9B58" },
};

export function TemplatesPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeTeam, setActiveTeam] = useState<TeamName | "Tous">("Tous");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState<TemplateType | null>(null);
  const [createStep, setCreateStep] = useState(1);
  const [selectedTeamCreate, setSelectedTeamCreate] = useState<TeamName | null>(null);
  const [startFromScratch, setStartFromScratch] = useState<boolean | null>(null); // true = from scratch, false = from template

  const filtered = activeTeam === "Tous" 
    ? templates 
    : templates.filter((t) => t.team === activeTeam);

  const teamTemplatesCount = activeTeam === "Tous" 
    ? templates.length 
    : templates.filter((t) => t.team === activeTeam).length;
  const teamActiveCount = activeTeam === "Tous"
    ? templates.filter((t) => t.active).length
    : templates.filter((t) => t.team === activeTeam && t.active).length;

  // Templates existants du type sélectionné pour l'étape 3
  const existingTemplatesOfType = selectedType 
    ? templates.filter((t) => t.type === selectedType)
    : [];

  const resetCreateModal = () => {
    setShowCreateModal(false);
    setCreateStep(1);
    setSelectedType(null);
    setSelectedTeamCreate(null);
    setStartFromScratch(null);
  };

  const getStepTitle = () => {
    switch (createStep) {
      case 1:
        return "Choisissez le type de visuel que vous souhaitez créer";
      case 2:
        return "Pour quelle équipe est ce template ?";
      case 3:
        return "Partir de zéro ou d'un modèle ?";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Templates</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>
            {teamTemplatesCount} templates · {teamActiveCount} actifs
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
          style={{ background: "#04346D" }}
        >
          <Plus className="w-4 h-4" />
          Créer un template
        </button>
      </div>

      {/* Team Tabs */}
      <div className="flex items-center gap-2 border-b pb-0" style={{ borderColor: "rgba(4,52,109,0.1)" }}>
        {(["Tous", "Équipe 1", "Réserve", "U18"] as (TeamName | "Tous")[]).map((team) => {
          const isActive = activeTeam === team;
          const color = team === "Tous" ? { bg: "#F8F9FA", text: "#04346D", border: "#04346D" } : teamColors[team];
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

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.filter(t => activeTeam === "Tous" || t.team === activeTeam).map((tpl) => {
          const { icon: Icon, color, bg } = typeConfig[tpl.type];
          return (
            <button
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl)}
              onMouseEnter={() => setHoveredId(tpl.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="rounded-2xl overflow-hidden transition-all hover:shadow-xl text-left"
              style={{ 
                background: "white", 
                border: "1px solid rgba(4,52,109,0.07)",
                transform: hoveredId === tpl.id ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {/* Visual preview */}
              <div className="relative" style={{ aspectRatio: "1/1", background: tpl.gradient }}>
                {/* Mock visual content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {tpl.type === "Résultat" && (
                    <div className="flex items-center gap-3">
                      <span className="text-white text-2xl" style={{ fontWeight: 800 }}>3</span>
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>–</span>
                      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.5rem", fontWeight: 800 }}>1</span>
                    </div>
                  )}
                  {tpl.type === "Affiche" && (
                    <div className="text-center">
                      <p className="text-white text-xs" style={{ fontWeight: 600 }}>FC Beaumont</p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }}>vs</p>
                      <p className="text-white text-xs" style={{ fontWeight: 600 }}>St-Priest FC</p>
                    </div>
                  )}
                </div>

                {/* Format badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                    {tpl.format === "Story" ? "S" : "P"}
                  </span>
                </div>

                {/* Inactive overlay */}
                {!tpl.active && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
                    <span className="text-xs px-3 py-1 rounded-full text-white" style={{ background: "rgba(0,0,0,0.5)" }}>Inactif</span>
                  </div>
                )}
              </div>

              {/* Card footer */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    
                    <div className="mt-1">
                      <span 
                        className="text-xs px-2 py-0.5 rounded inline-block" 
                        style={{ 
                          background: "#F8F9FA", 
                          color: "#04346D", 
                          fontWeight: 600,
                          borderLeft: `3px solid ${teamColors[tpl.team].text}`,
                          boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                        }}
                      >
                        {tpl.team}
                      </span>
                    </div>
                  </div>
                  <span 
                    className="text-xs px-2.5 py-1 rounded-full inline-block flex-shrink-0" 
                    style={{ 
                      background: "#04346D", 
                      color: "#F5F3EB",
                      fontWeight: 600
                    }}
                  >
                    {tpl.type}
                  </span>
                </div>
              </div>
            </button>
          );
        })}

        {/* Create new */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:opacity-80"
          style={{ background: "white", border: "1.5px dashed rgba(4,52,109,0.2)", minHeight: 280 }}
        >
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(4,52,109,0.05)" }}>
            <Plus className="w-6 h-6" style={{ color: "rgba(4,52,109,0.4)" }} />
          </div>
          <div className="text-center">
            <p className="text-sm" style={{ color: "rgba(4,52,109,0.5)", fontWeight: 500 }}>Nouveau template</p>
            <p className="text-xs mt-1" style={{ color: "rgba(4,52,109,0.35)" }}>Créer depuis zéro ou depuis un modèle</p>
          </div>
        </button>
      </div>

      {/* Builder info banner */}
      <div className="rounded-2xl p-5 flex items-center gap-5" style={{ background: "rgba(4,52,109,0.04)", border: "1px solid rgba(4,52,109,0.08)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#04346D" }}>
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Builder visuel intégré</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.55)" }}>
            Personnalisez vos templates : couleurs, polices, disposition. Aucune compétence design requise.
          </p>
        </div>
        <button className="flex-shrink-0 px-4 py-2 rounded-xl text-sm transition-all hover:opacity-90" style={{ background: "#04346D", color: "white", fontWeight: 500 }}>
          Ouvrir le builder
        </button>
      </div>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: "rgba(4,52,109,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedTemplate(null)}
        >
          <div 
            className="rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            style={{ background: "white" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with preview */}
            <div className="relative" style={{ height: 200, background: selectedTemplate.gradient }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTemplate(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
                style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                {(() => {
                  const { icon: Icon } = typeConfig[selectedTemplate.type];
                  return (
                    <>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {selectedTemplate.type === "Résultat" && (
                        <div className="flex items-center gap-3">
                          <span className="text-white text-3xl" style={{ fontWeight: 800 }}>3</span>
                          <span style={{ color: "rgba(255,255,255,0.5)" }}>–</span>
                          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "2rem", fontWeight: 800 }}>1</span>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              {/* Format badge */}
              <div className="absolute top-4 left-4">
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.25)", color: "white", fontWeight: 600 }}>
                  {selectedTemplate.format === "Story" ? "Story" : "Post"}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Template info */}
              <div>
                <h2 className="text-xl" style={{ color: "#04346D", fontWeight: 700 }}>Template {selectedTemplate.id}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span 
                    className="text-xs px-2.5 py-1 rounded" 
                    style={{ 
                      background: "#F8F9FA", 
                      color: "#04346D", 
                      fontWeight: 600,
                      borderLeft: `3px solid ${teamColors[selectedTemplate.team].text}`,
                      boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                    }}
                  >
                    {selectedTemplate.team}
                  </span>
                  <span 
                    className="text-xs px-2.5 py-1 rounded-full" 
                    style={{ 
                      background: "#04346D", 
                      color: "#F5F3EB",
                      fontWeight: 600
                    }}
                  >
                    {selectedTemplate.type}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all hover:shadow-md"
                  style={{ background: "#04346D", color: "white", fontWeight: 600 }}
                >
                  <Pencil className="w-4 h-4" />
                  Modifier le template
                </button>

                <button 
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all hover:shadow-md"
                  style={{ background: "rgba(4,52,109,0.06)", color: "#04346D", fontWeight: 600 }}
                >
                  <Copy className="w-4 h-4" />
                  Dupliquer
                </button>

                <button 
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all hover:shadow-md"
                  style={{ background: "rgba(255,107,53,0.08)", color: "#FF6B35", fontWeight: 600 }}
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>

              {/* Last used info */}
              {selectedTemplate.lastUsed && (
                <p className="text-xs text-center pt-2" style={{ color: "rgba(4,52,109,0.4)" }}>
                  Dernière utilisation : {selectedTemplate.lastUsed}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Template Modal - Multi-step */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: "rgba(4,52,109,0.5)", backdropFilter: "blur(4px)" }}
          onClick={resetCreateModal}
        >
          <div 
            className="rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
            style={{ background: "white", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 border-b" style={{ borderColor: "rgba(4,52,109,0.1)" }}>
              {createStep > 1 && (
                <button
                  onClick={() => setCreateStep(createStep - 1)}
                  className="absolute top-6 left-6 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(4,52,109,0.08)" }}
                >
                  <ChevronLeft className="w-4 h-4" style={{ color: "#04346D" }} />
                </button>
              )}

              <button
                onClick={resetCreateModal}
                className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(4,52,109,0.08)" }}
              >
                <X className="w-4 h-4" style={{ color: "#04346D" }} />
              </button>

              <div className={createStep > 1 ? "pl-10" : ""}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(4,52,109,0.1)", color: "#04346D", fontWeight: 600 }}>
                    Étape {createStep}/3
                  </span>
                </div>
                <h2 className="text-2xl" style={{ color: "#04346D", fontWeight: 700 }}>Créer un nouveau template</h2>
                <p className="text-sm mt-1" style={{ color: "rgba(4,52,109,0.55)" }}>
                  {getStepTitle()}
                </p>
              </div>
            </div>

            {/* Modal Content - Step 1: Type Selection */}
            {createStep === 1 && (
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Résultat */}
                  <button
                    onClick={() => setSelectedType("Résultat")}
                    className="group p-5 rounded-2xl transition-all hover:shadow-lg text-left"
                    style={{ 
                      background: selectedType === "Résultat" ? "rgba(10,94,191,0.08)" : "rgba(4,52,109,0.03)",
                      border: selectedType === "Résultat" ? "2px solid #0A5EBF" : "2px solid transparent"
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: typeConfig.Résultat.bg }}
                      >
                        <Trophy className="w-6 h-6" style={{ color: typeConfig.Résultat.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base" style={{ color: "#04346D", fontWeight: 600 }}>Résultat de match</h3>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(4,52,109,0.6)" }}>
                          Partagez automatiquement les résultats de vos matchs avec le score final et les informations du match.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(10,94,191,0.1)", color: "#0A5EBF", fontWeight: 500 }}>
                            Score final
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(10,94,191,0.1)", color: "#0A5EBF", fontWeight: 500 }}>
                            Automatique
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Affiche */}
                  <button
                    onClick={() => setSelectedType("Affiche")}
                    className="group p-5 rounded-2xl transition-all hover:shadow-lg text-left"
                    style={{ 
                      background: selectedType === "Affiche" ? "rgba(122,15,176,0.08)" : "rgba(4,52,109,0.03)",
                      border: selectedType === "Affiche" ? "2px solid #7A0FB0" : "2px solid transparent"
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: typeConfig.Affiche.bg }}
                      >
                        <Layout className="w-6 h-6" style={{ color: typeConfig.Affiche.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base" style={{ color: "#04346D", fontWeight: 600 }}>Affiche de match</h3>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(4,52,109,0.6)" }}>
                          Annoncez vos prochains matchs avec une affiche professionnelle incluant date, heure et adversaire.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(122,15,176,0.1)", color: "#7A0FB0", fontWeight: 500 }}>
                            Match à venir
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(122,15,176,0.1)", color: "#7A0FB0", fontWeight: 500 }}>
                            Promo
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Classement */}
                  <button
                    onClick={() => setSelectedType("Classement")}
                    className="group p-5 rounded-2xl transition-all hover:shadow-lg text-left"
                    style={{ 
                      background: selectedType === "Classement" ? "rgba(212,100,10,0.08)" : "rgba(4,52,109,0.03)",
                      border: selectedType === "Classement" ? "2px solid #D4640A" : "2px solid transparent"
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: typeConfig.Classement.bg }}
                      >
                        <BarChart2 className="w-6 h-6" style={{ color: typeConfig.Classement.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base" style={{ color: "#04346D", fontWeight: 600 }}>Classement</h3>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(4,52,109,0.6)" }}>
                          Montrez la position de votre équipe dans le classement avec un visuel clair et attractif.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(212,100,10,0.1)", color: "#D4640A", fontWeight: 500 }}>
                            Tableau
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(212,100,10,0.1)", color: "#D4640A", fontWeight: 500 }}>
                            Stats
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Score en live */}
                  <button
                    onClick={() => setSelectedType("Calendrier")}
                    className="group p-5 rounded-2xl transition-all hover:shadow-lg text-left"
                    style={{ 
                      background: selectedType === "Calendrier" ? "rgba(15,155,88,0.08)" : "rgba(4,52,109,0.03)",
                      border: selectedType === "Calendrier" ? "2px solid #0F9B58" : "2px solid transparent"
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: typeConfig.Calendrier.bg }}
                      >
                        <Radio className="w-6 h-6" style={{ color: typeConfig.Calendrier.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base" style={{ color: "#04346D", fontWeight: 600 }}>Score en live</h3>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(4,52,109,0.6)" }}>
                          Publiez des mises à jour en temps réel du score pendant vos matchs pour engager vos supporters.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(15,155,88,0.1)", color: "#0F9B58", fontWeight: 500 }}>
                            Temps réel
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(15,155,88,0.1)", color: "#0F9B58", fontWeight: 500 }}>
                            Engagement
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Info banner */}
                <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(4,52,109,0.04)", border: "1px solid rgba(4,52,109,0.08)" }}>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#FF6B35" }} />
                    <div>
                      <p className="text-xs" style={{ color: "#04346D", fontWeight: 600 }}>Personnalisable à 100%</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(4,52,109,0.6)" }}>
                        Chaque template peut être entièrement personnalisé avec vos couleurs, logos, polices et dispositions via notre builder visuel intégré.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={resetCreateModal}
                    className="flex-1 px-4 py-3 rounded-xl text-sm transition-all hover:opacity-80"
                    style={{ background: "rgba(4,52,109,0.06)", color: "#04346D", fontWeight: 600 }}
                  >
                    Annuler
                  </button>
                  <button
                    disabled={!selectedType}
                    onClick={() => setCreateStep(2)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm transition-all"
                    style={{ 
                      background: selectedType ? "#04346D" : "rgba(4,52,109,0.3)", 
                      color: "white", 
                      fontWeight: 600,
                      cursor: selectedType ? "pointer" : "not-allowed",
                      opacity: selectedType ? 1 : 0.5
                    }}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {/* Modal Content - Step 2: Team Selection */}
            {createStep === 2 && (
              <div className="p-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {(["Équipe 1", "Réserve", "U18"] as TeamName[]).map((team) => (
                    <button
                      key={team}
                      onClick={() => setSelectedTeamCreate(team)}
                      className="p-6 rounded-2xl transition-all hover:shadow-lg text-center"
                      style={{ 
                        background: selectedTeamCreate === team ? teamColors[team].bg : "rgba(4,52,109,0.03)",
                        border: selectedTeamCreate === team ? `2px solid ${teamColors[team].text}` : "2px solid transparent"
                      }}
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: teamColors[team].bg, border: `2px solid ${teamColors[team].text}` }}
                      >
                        <span className="text-2xl" style={{ fontWeight: 800, color: teamColors[team].text }}>
                          {team === "Équipe 1" ? "1" : team === "Réserve" ? "R" : "U18"}
                        </span>
                      </div>
                      <h3 className="text-base" style={{ color: "#04346D", fontWeight: 600 }}>{team}</h3>
                      <p className="text-xs mt-1" style={{ color: "rgba(4,52,109,0.5)" }}>
                        {team === "Équipe 1" ? "Équipe principale" : team === "Réserve" ? "Équipe réserve" : "Équipe junior"}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Info banner */}
                <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(4,52,109,0.04)", border: "1px solid rgba(4,52,109,0.08)" }}>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#FF6B35" }} />
                    <div>
                      <p className="text-xs" style={{ color: "#04346D", fontWeight: 600 }}>Organisation par équipe</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(4,52,109,0.6)" }}>
                        Chaque template est associé à une équipe spécifique pour faciliter la gestion et l'organisation de vos publications.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => setCreateStep(1)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm transition-all hover:opacity-80"
                    style={{ background: "rgba(4,52,109,0.06)", color: "#04346D", fontWeight: 600 }}
                  >
                    Retour
                  </button>
                  <button
                    disabled={!selectedTeamCreate}
                    onClick={() => setCreateStep(3)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm transition-all"
                    style={{ 
                      background: selectedTeamCreate ? "#04346D" : "rgba(4,52,109,0.3)", 
                      color: "white", 
                      fontWeight: 600,
                      cursor: selectedTeamCreate ? "pointer" : "not-allowed",
                      opacity: selectedTeamCreate ? 1 : 0.5
                    }}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {/* Modal Content - Step 3: Starting Point */}
            {createStep === 3 && (
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Partir de zéro */}
                  <button
                    onClick={() => setStartFromScratch(true)}
                    className="p-6 rounded-2xl transition-all hover:shadow-lg text-left"
                    style={{ 
                      background: startFromScratch === true ? "rgba(4,52,109,0.08)" : "rgba(4,52,109,0.03)",
                      border: startFromScratch === true ? "2px solid #04346D" : "2px solid transparent"
                    }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(4,52,109,0.1)" }}>
                      <Sparkles className="w-7 h-7" style={{ color: "#04346D" }} />
                    </div>
                    <h3 className="text-lg" style={{ color: "#04346D", fontWeight: 600 }}>Partir de zéro</h3>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(4,52,109,0.6)" }}>
                      Créez un template entièrement personnalisé depuis une page vierge avec notre builder visuel intuitif.
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(4,52,109,0.1)", color: "#04346D", fontWeight: 500 }}>
                        Liberté totale
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(4,52,109,0.1)", color: "#04346D", fontWeight: 500 }}>
                        Unique
                      </span>
                    </div>
                  </button>

                  {/* Partir d'un template */}
                  <button
                    onClick={() => setStartFromScratch(false)}
                    className="p-6 rounded-2xl transition-all hover:shadow-lg text-left"
                    style={{ 
                      background: startFromScratch === false ? "rgba(255,107,53,0.08)" : "rgba(4,52,109,0.03)",
                      border: startFromScratch === false ? "2px solid #FF6B35" : "2px solid transparent"
                    }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(255,107,53,0.1)" }}>
                      <Copy className="w-7 h-7" style={{ color: "#FF6B35" }} />
                    </div>
                    <h3 className="text-lg" style={{ color: "#04346D", fontWeight: 600 }}>Partir d'un template</h3>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(4,52,109,0.6)" }}>
                      Gagnez du temps en personnalisant un de vos templates existants déjà configurés.
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35", fontWeight: 500 }}>
                        Rapide
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35", fontWeight: 500 }}>
                        {existingTemplatesOfType.length} disponibles
                      </span>
                    </div>
                  </button>
                </div>

                {/* Si partir d'un template, afficher la liste */}
                {startFromScratch === false && existingTemplatesOfType.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm mb-3" style={{ color: "#04346D", fontWeight: 600 }}>
                      Choisissez un template de base :
                    </p>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {existingTemplatesOfType.map((tpl) => {
                        const { icon: Icon } = typeConfig[tpl.type];
                        return (
                          <button
                            key={tpl.id}
                            className="w-full p-3 rounded-xl flex items-center gap-4 transition-all hover:shadow-md text-left"
                            style={{ background: "rgba(4,52,109,0.04)", border: "1px solid rgba(4,52,109,0.08)" }}
                          >
                            <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ background: tpl.gradient }}>
                              <div className="w-full h-full flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Template {tpl.id}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span 
                                  className="text-xs px-2 py-0.5 rounded" 
                                  style={{ 
                                    background: teamColors[tpl.team].bg, 
                                    color: teamColors[tpl.team].text, 
                                    fontWeight: 500 
                                  }}
                                >
                                  {tpl.team}
                                </span>
                                <span className="text-xs" style={{ color: "rgba(4,52,109,0.4)" }}>·</span>
                                <span className="text-xs" style={{ color: "rgba(4,52,109,0.5)" }}>{tpl.format}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Info banner */}
                <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(4,52,109,0.04)", border: "1px solid rgba(4,52,109,0.08)" }}>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#FF6B35" }} />
                    <div>
                      <p className="text-xs" style={{ color: "#04346D", fontWeight: 600 }}>Modification illimitée</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(4,52,109,0.6)" }}>
                        Quel que soit votre choix, vous pourrez modifier tous les aspects du template dans le builder après cette étape.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => setCreateStep(2)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm transition-all hover:opacity-80"
                    style={{ background: "rgba(4,52,109,0.06)", color: "#04346D", fontWeight: 600 }}
                  >
                    Retour
                  </button>
                  <button
                    disabled={startFromScratch === null}
                    className="flex-1 px-4 py-3 rounded-xl text-sm transition-all"
                    style={{ 
                      background: startFromScratch !== null ? "#04346D" : "rgba(4,52,109,0.3)", 
                      color: "white", 
                      fontWeight: 600,
                      cursor: startFromScratch !== null ? "pointer" : "not-allowed",
                      opacity: startFromScratch !== null ? 1 : 0.5
                    }}
                  >
                    Créer le template
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}