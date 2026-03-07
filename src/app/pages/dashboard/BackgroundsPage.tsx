import { useState, useRef } from "react";
import { Plus, Upload, X, ChevronDown, Image as ImageIcon, Clock, Info } from "lucide-react";

const img1 = "https://images.unsplash.com/photo-1760384702320-a7409c8b4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBuaWdodCUyMGxpZ2h0cyUyMGFlcmlhbHxlbnwxfHx8fDE3NzIzNzk1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const img2 = "https://images.unsplash.com/photo-1629441376840-af359be6d172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB0ZWFtJTIwamVyc2V5JTIwdGV4dHVyZSUyMGFic3RyYWN0fGVufDF8fHx8MTc3MjM3OTUzNnww&ixlib=rb-4.1.0&q=80&w=1080";
const img3 = "https://images.unsplash.com/photo-1582583642747-45910b2147aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMGdyYXNzJTIwZ3JlZW4lMjB0ZXh0dXJlfGVufDF8fHx8MTc3MjM3OTUzNnww&ixlib=rb-4.1.0&q=80&w=1080";
const img4 = "https://images.unsplash.com/photo-1752673510841-275144e92ed3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMG1hdGNoJTIwYWN0aW9uJTIwc3BvcnQlMjBkeW5hbWljfGVufDF8fHx8MTc3MjM3OTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const img5 = "https://images.unsplash.com/photo-1556816214-6d16c62fbbf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwY3Jvd2QlMjBjaGVlcmluZ3xlbnwxfHx8fDE3NzIzNzk1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080";
const img6 = "https://images.unsplash.com/photo-1732511821776-14d2274e5b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJsdWUlMjBnZW9tZXRyaWMlMjBzcG9ydCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcyMzc5NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080";

interface BackgroundCard {
  id: number;
  url: string;
  type: string;
  team: string;
  schedule: string;
  template: string;
  format?: "post" | "story";
}

interface UsedBackground {
  id: number;
  url: string;
  usedDate: string;
}

const upcomingBgs: BackgroundCard[] = [
  { id: 1, url: img1, type: "Résultat", team: "Équipe 1", schedule: "J+1 · 09:00", template: "Résultat victoire", format: "post" },
  { id: 2, url: img4, type: "Affiche", team: "Équipe 1", schedule: "J-2 · 18:00", template: "Affiche match", format: "story" },
  { id: 3, url: img3, type: "Classement", team: "Réserve", schedule: "Lundi · 10:00", template: "Classement semaine", format: "post" },
  { id: 4, url: img5, type: "Résultat", team: "U18", schedule: "Dimanche · 20:00", template: "Résultat U18", format: "story" },
];

const usedBgs: UsedBackground[] = [
  { id: 1, url: img2, usedDate: "23 fév. 2026" },
  { id: 2, url: img6, usedDate: "16 fév. 2026" },
  { id: 3, url: img3, usedDate: "9 fév. 2026" },
  { id: 4, url: img1, usedDate: "2 fév. 2026" },
  { id: 5, url: img4, usedDate: "26 jan. 2026" },
  { id: 6, url: img5, usedDate: "19 jan. 2026" },
];

const reserveBgs = [img2, img6];

const typeColors: Record<string, { color: string; bg: string }> = {
  Résultat: { color: "#0A5EBF", bg: "#E8F4FF" },
  Affiche: { color: "#7A0FB0", bg: "#F3EEFB" },
  Classement: { color: "#D4640A", bg: "#FFF3E8" },
  Calendrier: { color: "#0F9B58", bg: "#EEFBF3" },
};

const teamColors: Record<string, { bg: string; text: string; border: string }> = {
  "Équipe 1": { bg: "#FFE8E0", text: "#FF6B35", border: "#FF6B35" },
  "Réserve": { bg: "#EBE0FF", text: "#7A0FB0", border: "#7A0FB0" },
  "U18": { bg: "#E0F5EA", text: "#0F9B58", border: "#0F9B58" },
};

const visualTypeColor = {
  bg: "#04346D",
  text: "#F5F3EB",
};

function UploadModal({ onClose }: { onClose: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [team, setTeam] = useState("Équipe 1");
  const [template, setTemplate] = useState("Résultat victoire");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(4,52,109,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: "white" }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(4,52,109,0.07)" }}>
          <h3 style={{ color: "#04346D", fontWeight: 700 }}>Ajouter un arrière-plan</h3>
          <button onClick={onClose} style={{ color: "rgba(4,52,109,0.4)" }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Upload zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); setFiles(["image1.jpg"]); }}
            className="rounded-2xl p-8 flex flex-col items-center gap-3 text-center cursor-pointer transition-all"
            style={{
              background: dragging ? "rgba(4,52,109,0.06)" : "#F5F3EB",
              border: `2px dashed ${dragging ? "#04346D" : "rgba(4,52,109,0.2)"}`,
            }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: dragging ? "#04346D" : "rgba(4,52,109,0.08)" }}>
              <Upload className="w-6 h-6" style={{ color: dragging ? "white" : "rgba(4,52,109,0.5)" }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Glissez vos images ici</p>
              <p className="text-xs mt-1" style={{ color: "rgba(4,52,109,0.5)" }}>ou cliquez pour sélectionner — JPG, PNG, WEBP · Plusieurs fichiers acceptés</p>
            </div>
            {files.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(15,155,88,0.1)" }}>
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs" style={{ color: "#0F9B58", fontWeight: 600 }}>{files.length} fichier(s) prêt(s)</span>
              </div>
            )}
          </div>

          {/* Attribution */}
          <div className="space-y-3">
            <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Attribuer à un visuel</p>

            <div>
              <label className="block text-xs mb-1.5" style={{ color: "rgba(4,52,109,0.6)" }}>Équipe concernée</label>
              <div className="relative">
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-xl text-sm outline-none pr-8"
                  style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                >
                  <option>Équipe 1</option>
                  <option>Réserve</option>
                  <option>U18</option>
                  <option>Toutes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(4,52,109,0.4)" }} />
              </div>
            </div>

            <div>
              <label className="block text-xs mb-1.5" style={{ color: "rgba(4,52,109,0.6)" }}>Attribuer à un visuel</label>
              <div className="relative">
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-xl text-sm outline-none pr-8"
                  style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}
                >
                  <option>Résultat victoire</option>
                  <option>Résultat défaite</option>
                  <option>Affiche match</option>
                  <option>Classement semaine</option>
                  <option>Calendrier mensuel</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(4,52,109,0.4)" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}>
            Annuler
          </button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm text-white transition-all hover:opacity-90" style={{ background: "#04346D", fontWeight: 600 }}>
            Ajouter l'arrière-plan
          </button>
        </div>
      </div>
    </div>
  );
}

function EditBackgroundModal({ background, onClose }: { background: BackgroundCard; onClose: () => void }) {
  const [dragging, setDragging] = useState(false);
  const teamColor = teamColors[background.team as keyof typeof teamColors];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4" 
      style={{ background: "rgba(4,52,109,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-2xl overflow-hidden" 
        style={{ background: "white" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(4,52,109,0.07)" }}>
          <div>
            <h3 style={{ color: "#04346D", fontWeight: 700 }}>Modifier l'arrière-plan</h3>
            <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.5)" }}>
              {background.template} · {background.team} · {background.schedule}
            </p>
          </div>
          <button onClick={onClose} className="hover:opacity-60 transition-opacity" style={{ color: "rgba(4,52,109,0.4)" }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Image preview */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs mb-2" style={{ color: "rgba(4,52,109,0.6)", fontWeight: 600 }}>Aperçu actuel</p>
              <div 
                className="rounded-xl overflow-hidden" 
                style={{ 
                  aspectRatio: background.format === "story" ? "9/16" : "1/1",
                  background: "#F5F3EB",
                  border: "2px solid rgba(4,52,109,0.08)"
                }}
              >
                <img src={background.url} alt="Arrière-plan" className="w-full h-full object-cover" />
              </div>
              
              {/* Info badges */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: visualTypeColor.bg, color: visualTypeColor.text, fontWeight: 600 }}>
                  {background.template}
                </span>
                <span 
                  className="text-xs px-2 py-0.5 rounded" 
                  style={{ 
                    background: "#F8F9FA", 
                    color: "#04346D", 
                    fontWeight: 600,
                    borderLeft: `3px solid ${teamColor.text}`,
                    boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                  }}
                >
                  {background.team}
                </span>
              </div>
            </div>

            {/* Replace image zone */}
            <div>
              <p className="text-xs mb-2" style={{ color: "rgba(4,52,109,0.6)", fontWeight: 600 }}>Remplacer l'image</p>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                className="rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition-all"
                style={{
                  aspectRatio: background.format === "story" ? "9/16" : "1/1",
                  background: dragging ? "rgba(4,52,109,0.06)" : "#F5F3EB",
                  border: `2px dashed ${dragging ? "#04346D" : "rgba(4,52,109,0.2)"}`,
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: dragging ? "#04346D" : "rgba(4,52,109,0.08)" }}>
                  <Upload className="w-5 h-5" style={{ color: dragging ? "white" : "rgba(4,52,109,0.5)" }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: "#04346D", fontWeight: 600 }}>Glissez une image</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(4,52,109,0.5)" }}>ou cliquez pour changer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-3 rounded-xl text-sm transition-all hover:bg-red-50" 
            style={{ border: "1.5px solid rgba(239,68,68,0.3)", color: "#EF4444" }}
          >
            Supprimer
          </button>
          <div className="flex-1" />
          <button onClick={onClose} className="px-5 py-3 rounded-xl text-sm" style={{ border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}>
            Annuler
          </button>
          <button onClick={onClose} className="px-5 py-3 rounded-xl text-sm text-white transition-all hover:opacity-90" style={{ background: "#04346D", fontWeight: 600 }}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export function BackgroundsPage() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [teamFilter, setTeamFilter] = useState<string>("Tous");
  const [showModal, setShowModal] = useState(false);
  const [hoveredUsed, setHoveredUsed] = useState<number | null>(null);
  const [hoveredBgId, setHoveredBgId] = useState<number | null>(null);
  const [reserveImages, setReserveImages] = useState<string[]>(reserveBgs);
  const [draggingReserve, setDraggingReserve] = useState(false);
  const [editingBackground, setEditingBackground] = useState<BackgroundCard | null>(null);

  const tabs = ["Vos prochains arrière-plans", "Arrière-plans utilisés", "Réserve aléatoire"];
  const teamFilters = ["Tous", "Équipe 1", "Réserve", "U18"];
  
  // Filter backgrounds by team
  const filteredBgs = teamFilter === "Tous" 
    ? upcomingBgs 
    : upcomingBgs.filter(bg => bg.team === teamFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Gestion des arrière-plans</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>
            Gérez les visuels utilisés en arrière-plan de vos publications.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)", width: "fit-content" }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i as 0 | 1 | 2)}
            className="px-4 py-2 rounded-lg text-sm transition-all"
            style={{
              background: activeTab === i ? "#04346D" : "transparent",
              color: activeTab === i ? "white" : "rgba(4,52,109,0.6)",
              fontWeight: activeTab === i ? 600 : 400,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 0 — Prochains */}
      {activeTab === 0 && (
        <div className="space-y-5">
          {/* Team filter tabs */}
          <div className="flex items-center gap-2 border-b pb-0" style={{ borderColor: "rgba(4,52,109,0.1)" }}>
            {teamFilters.map((filter) => {
              const isActive = teamFilter === filter;
              const teamColor = filter !== "Tous" ? teamColors[filter as keyof typeof teamColors] : { bg: "#F8F9FA", text: "#04346D", border: "#04346D" };
              
              return (
                <button
                  key={filter}
                  onClick={() => setTeamFilter(filter)}
                  className="px-5 py-3 text-sm font-medium transition-all relative"
                  style={{
                    color: isActive ? teamColor.text : "rgba(4,52,109,0.5)",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {filter}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: teamColor.text }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: "rgba(4,52,109,0.6)" }}>
              {filteredBgs.length} arrière-plan{filteredBgs.length > 1 ? "s" : ""} programmé{filteredBgs.length > 1 ? "s" : ""}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
              style={{ background: "#04346D" }}
            >
              <Plus className="w-4 h-4" />
              Ajouter un arrière-plan
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredBgs.map((bg) => {
              const isStory = bg.format === "story";
              const isHovered = hoveredBgId === bg.id;
              const teamColor = teamColors[bg.team as keyof typeof teamColors];
              
              return (
                <div 
                  key={bg.id} 
                  className="group"
                  onMouseEnter={() => setHoveredBgId(bg.id)}
                  onMouseLeave={() => setHoveredBgId(null)}
                >
                  {/* Image container with format-specific aspect ratio */}
                  <div 
                    className="rounded-xl overflow-hidden transition-all hover:shadow-xl relative cursor-pointer"
                    style={{ 
                      background: "white",
                      border: "1.5px solid rgba(4,52,109,0.06)",
                      aspectRatio: isStory ? "9/16" : "1/1"
                    }}
                    onClick={() => setEditingBackground(bg)}
                  >
                    {!isHovered && (
                      <>
                        <img src={bg.url} alt="Arrière-plan" className="w-full h-full object-cover" />
                        
                        {/* Badge P/S in corner */}
                        
                      </>
                    )}

                    {/* Hover overlay with template preview */}
                    {isHovered && (
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center p-6"
                        style={{ background: "linear-gradient(135deg, #04346D 0%, #0A5EBF 100%)" }}
                      >
                        {/* Club badge */}
                        <div className="mb-3 px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.4)" }}>
                          <span className="text-white text-[10px]" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
                            FC BEAUMONT
                          </span>
                        </div>

                        {/* Template content based on type */}
                        {bg.type === "Résultat" && (
                          <div className="flex items-center gap-3">
                            <span style={{ color: "white", fontSize: isStory ? "1.5rem" : "2rem", fontWeight: 900 }}>3</span>
                            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: isStory ? "1rem" : "1.5rem" }}>–</span>
                            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: isStory ? "1.5rem" : "2rem", fontWeight: 900 }}>1</span>
                          </div>
                        )}

                        {bg.type === "Affiche" && (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }} />
                            <span className="text-white text-xs opacity-70">VS</span>
                            <div className="w-8 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }} />
                          </div>
                        )}

                        {bg.type === "Classement" && (
                          <div className="w-full space-y-1">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 px-2 py-1 rounded"
                                style={{ background: "rgba(255,255,255,0.2)" }}
                              >
                                <span className="text-white text-xs w-3">{i}</span>
                                <div className="flex-1 h-1 rounded" style={{ background: "rgba(255,255,255,0.4)" }} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Info section - clean and readable */}
                  <div className="mt-3 space-y-2">
                    {/* Badges row */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-md flex-shrink-0" style={{ background: "rgba(4,52,109,0.07)", color: "#04346D", fontWeight: 700 }}>
                        {isStory ? "S" : "P"}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: visualTypeColor.bg, color: visualTypeColor.text, fontWeight: 600 }}>
                        {bg.template}
                      </span>
                    </div>
                    
                    {/* Team and schedule in subtle text */}
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span 
                        className="px-2 py-0.5 rounded" 
                        style={{ 
                          background: "#F8F9FA", 
                          color: "#04346D", 
                          fontWeight: 600,
                          borderLeft: `3px solid ${teamColor.text}`,
                          boxShadow: "0 2px 6px rgba(4,52,109,0.12)"
                        }}
                      >
                        {bg.team}
                      </span>
                      <span style={{ color: "rgba(4,52,109,0.3)" }}>·</span>
                      <span style={{ color: "rgba(4,52,109,0.5)" }}>{bg.schedule}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 1 — Used */}
      {activeTab === 1 && (
        <div className="space-y-5">
          <p className="text-sm" style={{ color: "rgba(4,52,109,0.6)" }}>
            {usedBgs.length} arrière-plan{usedBgs.length > 1 ? "s" : ""} utilisé{usedBgs.length > 1 ? "s" : ""} · Survolez pour voir la date d'utilisation.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {usedBgs.map((bg) => (
              <div
                key={bg.id}
                className="relative rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-md"
                style={{ aspectRatio: "1" }}
                onMouseEnter={() => setHoveredUsed(bg.id)}
                onMouseLeave={() => setHoveredUsed(null)}
              >
                <img src={bg.url} alt="Used background" className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                  style={{
                    background: "rgba(4,52,109,0.65)",
                    opacity: hoveredUsed === bg.id ? 1 : 0,
                  }}
                >
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-white mx-auto mb-1.5" />
                    <p className="text-white text-xs" style={{ fontWeight: 600 }}>Utilisé le</p>
                    <p className="text-white text-xs opacity-80">{bg.usedDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2 — Reserve */}
      {activeTab === 2 && (
        <div className="space-y-5">
          {/* Info box */}
          <div className="rounded-2xl p-4 flex items-start gap-4" style={{ background: "rgba(4,52,109,0.04)", border: "1px solid rgba(4,52,109,0.08)" }}>
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#04346D" }} />
            <div>
              <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Réserve aléatoire</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.6)", lineHeight: 1.6 }}>
                Les images ajoutées ici seront utilisées automatiquement et aléatoirement pour vos prochaines publications. Le système sélectionne une image différente à chaque nouveau visuel publié.
              </p>
            </div>
          </div>

          {/* Upload zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDraggingReserve(true); }}
            onDragLeave={() => setDraggingReserve(false)}
            onDrop={(e) => { e.preventDefault(); setDraggingReserve(false); setReserveImages([...reserveImages, img4]); }}
            className="rounded-2xl p-7 flex flex-col items-center gap-3 text-center cursor-pointer transition-all"
            style={{
              background: draggingReserve ? "rgba(4,52,109,0.06)" : "#F5F3EB",
              border: `2px dashed ${draggingReserve ? "#04346D" : "rgba(4,52,109,0.2)"}`,
            }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: draggingReserve ? "#04346D" : "rgba(4,52,109,0.08)" }}>
              <Upload className="w-6 h-6" style={{ color: draggingReserve ? "white" : "rgba(4,52,109,0.4)" }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Glissez vos images ici</p>
              <p className="text-xs mt-1" style={{ color: "rgba(4,52,109,0.5)" }}>ou cliquez pour sélectionner · Plusieurs fichiers acceptés · JPG, PNG, WEBP</p>
            </div>
          </div>

          {/* Grid */}
          {reserveImages.length > 0 && (
            <div>
              <p className="text-sm mb-3" style={{ color: "#04346D", fontWeight: 600 }}>
                {reserveImages.length} image{reserveImages.length > 1 ? "s" : ""} dans la réserve
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {reserveImages.map((url, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden" style={{ aspectRatio: "1" }}>
                    <img src={url} alt="Reserve" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setReserveImages(reserveImages.filter((_, idx) => idx !== i))}
                        className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)" }}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <div className="absolute bottom-1.5 left-1.5">
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(4,52,109,0.7)", color: "white", fontWeight: 600 }}>
                        #{i + 1}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Add more */}
                <button
                  onClick={() => setReserveImages([...reserveImages, img5])}
                  className="rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:opacity-80"
                  style={{ aspectRatio: "1", background: "rgba(4,52,109,0.04)", border: "1.5px dashed rgba(4,52,109,0.2)" }}
                >
                  <Plus className="w-5 h-5" style={{ color: "rgba(4,52,109,0.35)" }} />
                  <span className="text-xs" style={{ color: "rgba(4,52,109,0.4)" }}>Ajouter</span>
                </button>
              </div>
            </div>
          )}

          {reserveImages.length === 0 && (
            <div className="text-center py-8">
              <ImageIcon className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(4,52,109,0.2)" }} />
              <p className="text-sm" style={{ color: "rgba(4,52,109,0.45)" }}>Aucune image dans la réserve.</p>
              <p className="text-xs mt-1" style={{ color: "rgba(4,52,109,0.3)" }}>Ajoutez des images ci-dessus pour commencer.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
      {editingBackground && <EditBackgroundModal background={editingBackground} onClose={() => setEditingBackground(null)} />}
    </div>
  );
}