import { useState } from "react";
import { ChevronDown, Pencil, Clock, CalendarClock, Trophy, BarChart2, Layout, Radio, MessageSquare, MoreVertical, FileText } from "lucide-react";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { PostConfigDrawer } from "@/components/PostConfigDrawer";

type VisualType = "Résultat" | "Classement" | "Affiche" | "Calendrier";

type TeamTag = {
  label: string;
  color: string;
  bg: string;
  borderColor: string;
};

interface ScheduleRule {
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

const visualTypeConfig: Record<VisualType, { icon: typeof Trophy; color: string; bg: string }> = {
  Résultat: { icon: Trophy, color: "#0A5EBF", bg: "#E8F4FF" },
  Classement: { icon: BarChart2, color: "#D4640A", bg: "#FFF3E8" },
  Affiche: { icon: Layout, color: "#7A0FB0", bg: "#F3EEFB" },
  Calendrier: { icon: Radio, color: "#0F9B58", bg: "#EEFBF3" },
};

const teamColors: Record<string, TeamTag & { borderColor: string }> = {
  "Équipe 1": { label: "Équipe 1", color: "#04346D", bg: "#F8F9FA", borderColor: "#FF6B35" },
  "Réserve": { label: "Réserve", color: "#04346D", bg: "#F8F9FA", borderColor: "#7A0FB0" },
  "U18": { label: "U18", color: "#04346D", bg: "#F8F9FA", borderColor: "#0F9B58" },
  "Toutes": { label: "Toutes", color: "#04346D", bg: "#F8F9FA", borderColor: "#D4640A" },
};

const initialRules: ScheduleRule[] = [
  { 
    id: 1, 
    visualType: "Résultat", 
    format: "P", 
    teams: [teamColors["Équipe 1"]], 
    active: true, 
    moment: "J+1 (lendemain)", 
    time: "09:00",
    description: "🏆 Belle victoire de {team} face à {opponent} ! Score final : {score}\n\n#VictoireALaMaison",
    isCustomDescription: true,
    templates: ["Template Résultat Principal"],
    isCarousel: false
  },
  { 
    id: 2, 
    visualType: "Affiche", 
    format: "P", 
    teams: [teamColors["Équipe 1"]], 
    active: true, 
    moment: "J-2", 
    time: "18:00",
    templates: ["Template Affiche Match"],
    isCarousel: false
  },
  { 
    id: 3, 
    visualType: "Classement", 
    format: "P", 
    teams: [teamColors["Équipe 1"], teamColors["Réserve"]], 
    active: true, 
    moment: "Lundi", 
    time: "10:00",
    templates: ["Template Classement", "Template Stats"],
    isCarousel: true
  },
  { 
    id: 4, 
    visualType: "Affiche", 
    format: "S", 
    teams: [teamColors["Équipe 1"]], 
    active: false, 
    moment: "J-1 (veille du match)", 
    time: "17:00",
    templates: ["Template Affiche Story"],
    isCarousel: false
  },
  { 
    id: 5, 
    visualType: "Résultat", 
    format: "P", 
    teams: [teamColors["U18"]], 
    active: true, 
    moment: "Dimanche", 
    time: "20:00",
    templates: ["Template Résultat U18"],
    isCarousel: false
  },
  { 
    id: 6, 
    visualType: "Calendrier", 
    format: "P", 
    teams: [teamColors["Toutes"]], 
    active: true, 
    moment: "Lundi", 
    time: "08:00",
    templates: ["Template Calendrier Semaine"],
    isCarousel: false
  },
];

const momentOptions = [
  { group: "Jours fixes", options: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"] },
  { group: "Par rapport au match", options: ["J-4", "J-3", "J-2", "J-1 (veille du match)", "Jour J", "J+1 (lendemain)", "J+2", "J+3", "J+4"] },
];

const teamFilterOptions = ["Tous", "Équipe 1", "Réserve", "U18"];

function MomentSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none px-3 py-2 rounded-xl text-xs outline-none pr-7"
        style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D", minWidth: 170 }}
      >
        {momentOptions.map(({ group, options }) => (
          <optgroup key={group} label={group}>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" style={{ color: "rgba(4,52,109,0.4)" }} />
    </div>
  );
}

function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative flex-shrink-0 transition-all"
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: active ? "#04346D" : "rgba(4,52,109,0.15)",
      }}
    >
      <span
        className="absolute top-1 transition-transform duration-200"
        style={{
          width: 16,
          height: 16,
          borderRadius: 8,
          background: "white",
          left: 4,
          transform: active ? "translateX(20px)" : "translateX(0px)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

export function SchedulingPage() {
  const [rules, setRules] = useState<ScheduleRule[]>(initialRules);
  const [teamFilter, setTeamFilter] = useState("Tous");
  const [selectedRule, setSelectedRule] = useState<ScheduleRule | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredRules = teamFilter === "Tous"
    ? rules
    : rules.filter((r) => r.teams.some((t) => t.label === teamFilter));

  const toggleActive = (id: number) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const updateMoment = (id: number, moment: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, moment } : r)));
  };

  const updateTime = (id: number, time: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, time } : r)));
  };

  const openConfig = (rule: ScheduleRule) => {
    setSelectedRule(rule);
    setDrawerOpen(true);
  };

  const handleSaveConfig = (config: ScheduleRule) => {
    setRules(rules.map((r) => (r.id === config.id ? config : r)));
    notifications.show({
      message: "Configuration sauvegardée",
      color: "green",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Planification des publications</h1>
          <p className="mt-1 text-sm max-w-2xl" style={{ color: "rgba(4,52,109,0.55)", lineHeight: 1.6 }}>Choisissez quand vos visuels doivent se publier automatiquement chaque semaine de match. Le format (Story/Post) est défini dans le template.</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "rgba(15,155,88,0.1)", color: "#0F9B58" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {rules.filter((r) => r.active).length} actives
          </span>
          <span className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35" }}>
            <MessageSquare className="w-3 h-3" />
            {rules.filter((r) => r.format === "P" && r.isCustomDescription).length} descriptions perso
          </span>
        </div>
      </div>

      {/* Info banners */}
      <div className="space-y-3">
        <div className="rounded-2xl p-4 flex items-start gap-4" style={{ background: "rgba(4,52,109,0.04)", border: "1px solid rgba(4,52,109,0.08)" }}>
          <CalendarClock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#04346D" }} />
          <div>
            <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Ces règles s'appliquent uniquement les semaines de match</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.55)", lineHeight: 1.6 }}>Si aucun match n'est prévu pour une équipe, ne seront pas déclenchées automatiquement. Mais si l'équipe joue en fin de semaine 26 et que la publication est prévu à J+3 par ex. alors le visuel sera quand même publié 3 jours après le match même si c'est en semaine 27.</p>
          </div>
        </div>

        <div className="rounded-2xl p-4 flex items-start gap-4" style={{ background: "rgba(255,107,53,0.04)", border: "1px solid rgba(255,107,53,0.15)" }}>
          <MessageSquare className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#FF6B35" }} />
          <div>
            <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Personnalisez vos descriptions (Posts uniquement)</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.55)", lineHeight: 1.6 }}>
              Cliquez sur "Modifier" puis "Modifier la description" pour les Posts. Utilisez l'IA pour générer des textes accrocheurs ou insérez des variables dynamiques. Les Stories n'ont pas de description.
            </p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 border-b pb-0" style={{ borderColor: "rgba(4,52,109,0.1)" }}>
        {teamFilterOptions.map((opt) => {
          const isActive = teamFilter === opt;
          const teamColor = opt !== "Tous" && teamColors[opt]
            ? teamColors[opt]
            : { borderColor: "#04346D" };
          
          return (
            <button
              key={opt}
              onClick={() => setTeamFilter(opt)}
              className="px-5 py-3 text-sm font-medium transition-all relative"
              style={{
                color: isActive ? teamColor.borderColor : "rgba(4,52,109,0.5)",
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {opt}
              {isActive && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: teamColor.borderColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Table — desktop */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
        {/* Table header */}
        <div
          className="hidden md:grid px-6 py-3 text-xs border-b"
          style={{
            borderColor: "rgba(4,52,109,0.06)",
            background: "rgba(4,52,109,0.02)",
            color: "rgba(4,52,109,0.5)",
            fontWeight: 600,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            gridTemplateColumns: "2fr 1fr 80px 220px 100px 80px",
            gap: "1rem",
          }}
        >
          <span>Nom du visuel</span>
          <span>Équipe(s)</span>
          <span className="text-center">Actif</span>
          <span>Moment de publication</span>
          <span>Heure</span>
          <span className="text-center">Modifier</span>
        </div>

        {/* Rows */}
        <div className="divide-y" style={{ borderColor: "rgba(4,52,109,0.04)" }}>
          {filteredRules.map((rule) => (
            <div key={rule.id}>
              {/* Desktop row */}
              <div
                className="hidden md:grid px-6 py-4 items-center gap-4 transition-colors hover:bg-[rgba(4,52,109,0.015)]"
                style={{ gridTemplateColumns: "2fr 1fr 80px 220px 100px 80px" }}
              >
                {/* Visual type badge + format badge */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: "rgba(4,52,109,0.07)", color: "#04346D", fontWeight: 700 }}>
                    {rule.format}
                  </span>
                  <span 
                    className="text-xs px-2.5 py-1 rounded-full inline-block flex-shrink-0" 
                    style={{ 
                      background: "#04346D", 
                      color: "#F5F3EB",
                      fontWeight: 600
                    }}
                  >
                    {rule.visualType}
                  </span>
                  {rule.format === "P" && rule.isCustomDescription && (
                    <span title="Description personnalisée">
                      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#FF6B35" }} />
                    </span>
                  )}
                </div>

                {/* Team tags */}
                <div className="flex flex-wrap gap-1.5">
                  {rule.teams.map((tag) => (
                    <span
                      key={tag.label}
                      className="text-xs px-2.5 py-1 rounded" 
                      style={{ 
                        background: tag.bg, 
                        color: tag.color, 
                        fontWeight: 600,
                        borderLeft: `3px solid ${tag.borderColor}`,
                        boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-center">
                  <Toggle active={rule.active} onChange={() => toggleActive(rule.id)} />
                </div>

                {/* Moment dropdown */}
                <MomentSelect value={rule.moment} onChange={(v) => updateMoment(rule.id, v)} />

                {/* Time picker */}
                <div className="relative">
                  <input
                    type="time"
                    value={rule.time}
                    onChange={(e) => updateTime(rule.id, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                    style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D" }}
                  />
                </div>

                {/* Modify dropdown menu */}
                <div className="flex justify-center">
                  <div className="flex items-center gap-1">
                    {rule.format === "P" && (
                      <button
                        onClick={() => openConfig(rule)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[rgba(4,52,109,0.08)]"
                        style={{ background: "rgba(4,52,109,0.04)" }}
                        title="Modifier la description"
                      >
                        <MessageSquare className="w-4 h-4" style={{ color: "#04346D" }} />
                      </button>
                    )}
                    <Link
                      href="/dashboard/templates"
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-[rgba(4,52,109,0.08)]"
                      style={{ background: "rgba(4,52,109,0.04)" }}
                      title="Modifier le template"
                    >
                      <FileText className="w-4 h-4" style={{ color: "#04346D" }} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile card */}
              <div className="md:hidden p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: "rgba(4,52,109,0.07)", color: "#04346D", fontWeight: 700 }}>
                      {rule.format}
                    </span>
                    <span 
                      className="text-xs px-2.5 py-1 rounded-full inline-block" 
                      style={{ 
                        background: "#04346D", 
                        color: "#F5F3EB",
                        fontWeight: 600
                      }}
                    >
                      {rule.visualType}
                    </span>
                    {rule.format === "P" && rule.isCustomDescription && (
                      <MessageSquare className="w-3.5 h-3.5" style={{ color: "#FF6B35" }} />
                    )}
                  </div>
                  <Toggle active={rule.active} onChange={() => toggleActive(rule.id)} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {rule.teams.map((tag) => (
                    <span 
                      key={tag.label} 
                      className="text-xs px-2.5 py-1 rounded" 
                      style={{ 
                        background: tag.bg, 
                        color: tag.color, 
                        fontWeight: 600,
                        borderLeft: `3px solid ${tag.borderColor}`,
                        boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <MomentSelect value={rule.moment} onChange={(v) => updateMoment(rule.id, v)} />
                  <div className="relative flex-shrink-0">
                    <input
                      type="time"
                      value={rule.time}
                      onChange={(e) => updateTime(rule.id, e.target.value)}
                      className="px-3 py-2 rounded-xl text-xs outline-none"
                      style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.1)", color: "#04346D", width: 100 }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {rule.format === "P" && (
                    <button
                      onClick={() => openConfig(rule)}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all hover:opacity-80"
                      style={{ 
                        background: rule.isCustomDescription ? "rgba(255,107,53,0.1)" : "rgba(4,52,109,0.05)", 
                        color: rule.isCustomDescription ? "#FF6B35" : "#04346D",
                        border: `1.5px solid ${rule.isCustomDescription ? "rgba(255,107,53,0.2)" : "rgba(4,52,109,0.1)"}`
                      }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Description
                    </button>
                  )}
                  <Link
                    href="/dashboard/templates"
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all hover:opacity-80 ${rule.format === "S" ? "col-span-2" : ""}`}
                    style={{ 
                      background: "rgba(4,52,109,0.05)", 
                      color: "#04346D",
                      border: "1.5px solid rgba(4,52,109,0.1)"
                    }}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filteredRules.length === 0 && (
        <div className="rounded-2xl p-12 flex flex-col items-center justify-center text-center" style={{ background: "white", border: "1.5px dashed rgba(4,52,109,0.15)" }}>
          <Clock className="w-10 h-10 mb-3" style={{ color: "rgba(4,52,109,0.25)" }} />
          <p className="text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>Aucune règle pour cette équipe.</p>
          <p className="text-xs mt-1" style={{ color: "rgba(4,52,109,0.35)" }}>Sélectionnez "Tous" ou créez un template pour commencer.</p>
        </div>
      )}

      {/* Bottom tip */}
      <p className="text-xs text-center" style={{ color: "rgba(4,52,109,0.35)" }}>
        <span style={{ fontWeight: 600 }}>S</span> = Story &nbsp;·&nbsp; <span style={{ fontWeight: 600 }}>P</span> = Post &nbsp;·&nbsp; Le format est défini dans chaque template et non modifiable ici.
      </p>

      {/* Drawer */}
      <PostConfigDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        config={selectedRule as any}
        onSave={(config) => handleSaveConfig(config as any)}
      />
    </div>
  );
}
