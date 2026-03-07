import { useState, useEffect } from "react";
import { X, Sparkles, Calendar, Clock, Image as ImageIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Textarea } from "./ui/textarea";

type VisualType = "Résultat" | "Classement" | "Affiche" | "Calendrier";

type TeamTag = {
  label: string;
  color: string;
  bg: string;
  borderColor: string;
};

interface PostConfig {
  id: number;
  visualType: VisualType;
  format: "P" | "S";
  teams: TeamTag[];
  active: boolean;
  moment: string;
  time: string;
  description?: string;
  isCustomDescription?: boolean;
  templates?: string[];
  isCarousel?: boolean;
}

interface PostConfigDrawerProps {
  open: boolean;
  onClose: () => void;
  config: PostConfig | null;
  onSave: (config: PostConfig) => void;
}

const variables = [
  { key: "{team}", label: "Équipe" },
  { key: "{opponent}", label: "Adversaire" },
  { key: "{score}", label: "Score" },
  { key: "{date}", label: "Date" },
  { key: "{competition}", label: "Compétition" },
];

export function PostConfigDrawer({ open, onClose, config, onSave }: PostConfigDrawerProps) {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<string[]>([]);

  // Update description when config changes or drawer opens
  useEffect(() => {
    if (config && open) {
      setDescription(config.description || "");
      setVariants([]);
    }
  }, [config, open]);

  if (!config) return null;

  const templates = config.templates || [`Template ${config.visualType}`];
  const isCarousel = config.isCarousel || false;
  const hasChanges = description !== (config.description || "");

  const insertVariable = (variable: string) => {
    setDescription(description + variable);
  };

  const generateWithAI = () => {
    setIsGenerating(true);
    // Simulation de génération IA
    setTimeout(() => {
      const generated = `🏀 Match à domicile ce week-end !\n\n{team} affronte {opponent} le {date}. Venez nombreux soutenir nos joueurs ! 💪\n\n#${config.teams[0]?.label.replace(/\s/g, "")} #{competition}`;
      setDescription(generated);
      setIsGenerating(false);
    }, 1500);
  };

  const generateVariants = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setVariants([
        `🏆 {team} vs {opponent} - {date}\n\nRendez-vous pour soutenir nos joueurs ! 💙\n\n#{competition}`,
        `Match important ce week-end ! 🔥\n\n{team} reçoit {opponent} le {date}. Ambiance garantie au stade !\n\n#${config.teams[0]?.label.replace(/\s/g, "")}`,
        `⚽ Prochain match : {team} - {opponent}\n📅 {date}\n\nOn compte sur vous ! 👏`,
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  const applyVariant = (variant: string) => {
    setDescription(variant);
    setVariants([]);
  };

  const handleSave = () => {
    onSave({
      ...config,
      description,
      isCustomDescription: description.trim() !== "",
    });
    onClose();
  };

  // Preview avec remplacement des variables (exemple)
  const previewText = description
    .replace(/{team}/g, config.teams[0]?.label || "Équipe")
    .replace(/{opponent}/g, "AS Example")
    .replace(/{score}/g, "3-1")
    .replace(/{date}/g, "Samedi 8 mars à 15h00")
    .replace(/{competition}/g, "Championnat Régional");

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="overflow-y-auto p-0 w-full sm:max-w-[580px]"
        style={{ background: "#FAFAFA" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 pb-4" style={{ background: "white", borderBottom: "1px solid rgba(4,52,109,0.08)" }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <SheetTitle className="text-xl font-bold" style={{ color: "#04346D" }}>
                Configuration de la publication
              </SheetTitle>
              <SheetDescription className="text-sm mt-1" style={{ color: "rgba(4,52,109,0.55)" }}>
                {config.visualType} · {config.teams.map(t => t.label).join(", ")}
              </SheetDescription>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[rgba(4,52,109,0.06)]"
            >
              <X className="w-5 h-5" style={{ color: "#04346D" }} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Section A - Récap planification */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
            <h3 className="text-sm font-semibold" style={{ color: "#04346D" }}>
              📅 Planification
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(4,52,109,0.55)" }}>
                  Équipe(s)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {config.teams.map((tag) => (
                    <span
                      key={tag.label}
                      className="text-xs px-2.5 py-1 rounded"
                      style={{
                        background: tag.bg,
                        color: tag.color,
                        fontWeight: 600,
                        borderLeft: `3px solid ${tag.borderColor}`,
                        boxShadow: "0 2px 6px rgba(4,52,109,0.12)",
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(4,52,109,0.55)" }}>
                  Format
                </label>
                <span className="text-xs px-2.5 py-1.5 rounded-lg inline-block" style={{ background: "rgba(4,52,109,0.07)", color: "#04346D", fontWeight: 700 }}>
                  {config.format === "P" ? "Post" : "Story"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1.5 flex items-center gap-1.5" style={{ color: "rgba(4,52,109,0.55)" }}>
                  <Calendar className="w-3.5 h-3.5" />
                  Moment
                </label>
                <p className="text-sm font-medium" style={{ color: "#04346D" }}>
                  {config.moment}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium mb-1.5 flex items-center gap-1.5" style={{ color: "rgba(4,52,109,0.55)" }}>
                  <Clock className="w-3.5 h-3.5" />
                  Heure
                </label>
                <p className="text-sm font-medium" style={{ color: "#04346D" }}>
                  {config.time}
                </p>
              </div>
            </div>
          </div>

          {/* Section B - Visuels inclus */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#04346D" }}>
                <ImageIcon className="w-4 h-4" />
                Visuels inclus
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: isCarousel ? "rgba(138,43,226,0.1)" : "rgba(4,52,109,0.05)", color: isCarousel ? "#8A2BE2" : "#04346D", fontWeight: 600 }}>
                {isCarousel ? "Carrousel" : "Visuel unique"}
              </span>
            </div>

            <div className="space-y-2">
              {templates.map((template, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg" style={{ background: "rgba(4,52,109,0.03)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#04346D" }}>
                    <span className="text-white text-xs font-bold">{idx + 1}</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#04346D" }}>
                    {template}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section C - Description */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold" style={{ color: "#04346D" }}>
                💬 Description du post
              </h3>
              <button
                onClick={generateWithAI}
                disabled={isGenerating}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)", color: "white" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isGenerating ? "Génération..." : "Générer avec IA"}
              </button>
            </div>

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Écrivez la description de votre publication ici..."
              className="min-h-32 text-sm"
              style={{ 
                background: "#F5F3EB", 
                border: "1.5px solid rgba(4,52,109,0.1)", 
                color: "#04346D",
                fontFamily: "Inter, sans-serif"
              }}
            />

            {/* Generate variants button */}
            {variants.length === 0 && (
              <button
                onClick={generateVariants}
                disabled={isGenerating}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "rgba(4,52,109,0.05)", color: "#04346D", border: "1.5px solid rgba(4,52,109,0.1)" }}
              >
                {isGenerating ? "Génération en cours..." : "✨ Générer 3 variantes"}
              </button>
            )}

            {/* Variants */}
            {variants.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium" style={{ color: "rgba(4,52,109,0.55)" }}>
                  Variantes générées :
                </p>
                {variants.map((variant, idx) => (
                  <div key={idx} className="p-3 rounded-xl space-y-2" style={{ background: "rgba(4,52,109,0.03)", border: "1px solid rgba(4,52,109,0.08)" }}>
                    <p className="text-xs whitespace-pre-wrap" style={{ color: "#04346D" }}>
                      {variant}
                    </p>
                    <button
                      onClick={() => applyVariant(variant)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-[rgba(4,52,109,0.15)]"
                      style={{ background: "rgba(4,52,109,0.08)", color: "#04346D" }}
                    >
                      Appliquer la variante {idx + 1}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section D - Variables */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
            <h3 className="text-sm font-semibold" style={{ color: "#04346D" }}>
              🏷️ Variables disponibles
            </h3>
            <p className="text-xs" style={{ color: "rgba(4,52,109,0.55)", lineHeight: 1.6 }}>
              Cliquez sur une variable pour l'insérer dans la description. Elle sera automatiquement remplacée lors de la publication.
            </p>
            <div className="flex flex-wrap gap-2">
              {variables.map((v) => (
                <button
                  key={v.key}
                  onClick={() => insertVariable(v.key)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                  style={{ 
                    background: "#E8F4FD", 
                    color: "#04346D",
                    border: "1px solid rgba(4,52,109,0.15)"
                  }}
                >
                  {v.key}
                  <span className="ml-1.5 opacity-60">· {v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section E - Aperçu */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
            <h3 className="text-sm font-semibold" style={{ color: "#04346D" }}>
              👁️ Aperçu
            </h3>
            <div className="rounded-xl p-4" style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.08)" }}>
              {previewText ? (
                <p className="text-sm whitespace-pre-wrap" style={{ color: "#04346D", lineHeight: 1.6 }}>
                  {previewText}
                </p>
              ) : (
                <p className="text-sm italic" style={{ color: "rgba(4,52,109,0.35)" }}>
                  L'aperçu apparaîtra ici...
                </p>
              )}
            </div>
            <p className="text-xs" style={{ color: "rgba(4,52,109,0.45)", lineHeight: 1.5 }}>
              Exemple de rendu avec les données d'un match à venir. Les variables seront remplacées automatiquement.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 pt-4 space-y-3" style={{ background: "white", borderTop: "1px solid rgba(4,52,109,0.08)" }}>
          {hasChanges && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.15)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF6B35" }} />
              <p className="text-xs" style={{ color: "#FF6B35", fontWeight: 500 }}>
                Modifications non sauvegardées
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: "rgba(4,52,109,0.08)", color: "#04346D" }}
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
              style={{ background: hasChanges ? "#FF6B35" : "#04346D", color: "white" }}
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
