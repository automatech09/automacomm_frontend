import { useState } from "react";
import { Plus, Pencil, Trash2, Users, Shield, X, Camera, ArrowLeft, Upload, Palette } from "lucide-react";

// Séparation : Équipes (sans joueurs) et Effectif global du club
const initialTeams = [
  {
    id: 1,
    name: "Équipe 1",
    league: "Division Régionale 1 — Auvergne-Rhône-Alpes",
    color: "#FF6B35",
  },
  {
    id: 2,
    name: "Équipe Réserve",
    league: "Division Honneur Régionale",
    color: "#0F9B58",
  },
  {
    id: 3,
    name: "U18",
    league: "Championnat U18 Régional",
    color: "#7A0FB0",
  },
];

// Effectif global du club avec catégories d'âge
const initialPlayers = [
  { id: 1, firstName: "Lucas", lastName: "Martin", category: "Senior", photo: null },
  { id: 2, firstName: "Thomas", lastName: "Durand", category: "Senior", photo: null },
  { id: 3, firstName: "Hugo", lastName: "Petit", category: "Senior", photo: null },
  { id: 4, firstName: "Maxime", lastName: "Bernard", category: "Senior", photo: null },
  { id: 5, firstName: "Pierre", lastName: "Moreau", category: "Senior", photo: null },
  { id: 6, firstName: "Antoine", lastName: "Simon", category: "Senior", photo: null },
  { id: 7, firstName: "Nathan", lastName: "Richard", category: "Senior", photo: null },
  { id: 8, firstName: "Théo", lastName: "Lambert", category: "U18", photo: null },
  { id: 9, firstName: "Enzo", lastName: "Thomas", category: "U18", photo: null },
  { id: 10, firstName: "Louis", lastName: "Girard", category: "U15", photo: null },
  { id: 11, firstName: "Arthur", lastName: "Rousseau", category: "U15", photo: null },
];

const categories = ["Senior", "U18", "U15", "U13"];

export function TeamsPage() {
  const [teams, setTeams] = useState(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState(initialTeams[0]);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showEditTeam, setShowEditTeam] = useState(false);
  const [editingTeamData, setEditingTeamData] = useState<typeof initialTeams[0] | null>(null);
  
  // Gestion de l'effectif global
  const [managingRoster, setManagingRoster] = useState(false);
  const [players, setPlayers] = useState(initialPlayers);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);

  // Si on est en mode gestion de l'effectif global du club
  if (managingRoster) {
    const filteredPlayers = activeCategory === "Tous" 
      ? players 
      : players.filter(p => p.category === activeCategory);

    return (
      <div className="space-y-6">
        {/* Header de gestion */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setManagingRoster(false)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
              style={{ background: "rgba(4,52,109,0.06)" }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: "#04346D" }} />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" style={{ color: "#04346D" }} />
                <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Effectif du club</h1>
              </div>
              <p className="mt-1 text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>
                {players.length} joueur{players.length > 1 ? "s" : ""} au total
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddPlayer(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
            style={{ background: "#04346D" }}
          >
            <Plus className="w-4 h-4" />
            Ajouter un joueur
          </button>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory("Tous")}
            className="px-4 py-2 rounded-xl text-sm transition-all"
            style={{
              background: activeCategory === "Tous" ? "#04346D" : "white",
              color: activeCategory === "Tous" ? "white" : "#04346D",
              border: `1.5px solid ${activeCategory === "Tous" ? "#04346D" : "rgba(4,52,109,0.15)"}`,
              fontWeight: 600,
            }}
          >
            Tous ({players.length})
          </button>
          {categories.map(cat => {
            const count = players.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm transition-all"
                style={{
                  background: activeCategory === cat ? "#04346D" : "white",
                  color: activeCategory === cat ? "white" : "#04346D",
                  border: `1.5px solid ${activeCategory === cat ? "#04346D" : "rgba(4,52,109,0.15)"}`,
                  fontWeight: 600,
                }}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Tableau des joueurs */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
          {/* Header du tableau */}
          <div className="px-6 py-4" style={{ background: "rgba(4,52,109,0.02)", borderBottom: "1px solid rgba(4,52,109,0.06)" }}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-1 text-xs uppercase tracking-wide" style={{ color: "rgba(4,52,109,0.5)", fontWeight: 600 }}>Photo</div>
              <div className="col-span-3 text-xs uppercase tracking-wide" style={{ color: "rgba(4,52,109,0.5)", fontWeight: 600 }}>Prénom</div>
              <div className="col-span-3 text-xs uppercase tracking-wide" style={{ color: "rgba(4,52,109,0.5)", fontWeight: 600 }}>Nom</div>
              <div className="col-span-3 text-xs uppercase tracking-wide" style={{ color: "rgba(4,52,109,0.5)", fontWeight: 600 }}>Catégorie</div>
              <div className="col-span-2 text-xs uppercase tracking-wide text-right" style={{ color: "rgba(4,52,109,0.5)", fontWeight: 600 }}>Actions</div>
            </div>
          </div>

          {/* Lignes des joueurs */}
          <div>
            {filteredPlayers.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Users className="w-12 h-12 mx-auto mb-3" style={{ color: "rgba(4,52,109,0.2)" }} />
                <p className="text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>Aucun joueur dans cette catégorie</p>
              </div>
            ) : (
              filteredPlayers.map((player, index) => (
                <div 
                  key={player.id}
                  className="px-6 py-4 transition-all hover:bg-opacity-50"
                  style={{ 
                    background: index % 2 === 0 ? "white" : "rgba(4,52,109,0.015)",
                    borderBottom: index < filteredPlayers.length - 1 ? "1px solid rgba(4,52,109,0.04)" : "none"
                  }}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Photo */}
                    <div className="col-span-1">
                      <button className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden group transition-all hover:ring-2 hover:ring-offset-2" style={{ background: "rgba(4,52,109,0.08)", ringColor: "#04346D" }}>
                        {player.photo ? (
                          <img src={player.photo} alt={`${player.firstName} ${player.lastName}`} className="w-full h-full object-cover" />
                        ) : (
                          <span style={{ color: "#04346D", fontWeight: 700, fontSize: "0.9rem" }}>
                            {player.firstName[0]}{player.lastName[0]}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    </div>

                    {/* Prénom */}
                    <div className="col-span-3">
                      {editingPlayerId === player.id ? (
                        <input
                          type="text"
                          defaultValue={player.firstName}
                          autoFocus
                          onBlur={(e) => {
                            const updatedPlayers = players.map(p => 
                              p.id === player.id ? { ...p, firstName: e.target.value } : p
                            );
                            setPlayers(updatedPlayers);
                            setEditingPlayerId(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.currentTarget.blur();
                            }
                          }}
                          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ background: "#F5F3EB", border: "1.5px solid #04346D", color: "#04346D", fontWeight: 600 }}
                        />
                      ) : (
                        <button
                          onClick={() => setEditingPlayerId(player.id)}
                          className="text-left w-full px-3 py-2 rounded-lg text-sm transition-all hover:bg-opacity-50"
                          style={{ color: "#04346D", fontWeight: 600 }}
                        >
                          {player.firstName}
                        </button>
                      )}
                    </div>

                    {/* Nom */}
                    <div className="col-span-3">
                      <span className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>
                        {player.lastName}
                      </span>
                    </div>

                    {/* Catégorie */}
                    <div className="col-span-3">
                      <span className="inline-block px-3 py-1.5 rounded-lg text-xs" style={{ background: "#F5F3EB", color: "#04346D", fontWeight: 600 }}>
                        {player.category}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingPlayerId(player.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                        style={{ background: "rgba(4,52,109,0.06)" }}
                      >
                        <Pencil className="w-3.5 h-3.5" style={{ color: "#04346D" }} />
                      </button>
                      <button
                        onClick={() => {
                          setPlayers(players.filter(p => p.id !== player.id));
                        }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                        style={{ background: "rgba(239,68,68,0.08)" }}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Zone d'ajout rapide */}
          <div className="px-6 py-4" style={{ background: "rgba(4,52,109,0.02)", borderTop: "1px solid rgba(4,52,109,0.06)" }}>
            <button
              onClick={() => setShowAddPlayer(true)}
              className="w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-80"
              style={{ background: "rgba(4,52,109,0.04)", border: "1.5px dashed rgba(4,52,109,0.15)" }}
            >
              <Plus className="w-4 h-4" style={{ color: "rgba(4,52,109,0.5)" }} />
              <span className="text-sm" style={{ color: "rgba(4,52,109,0.6)", fontWeight: 500 }}>Ajouter un nouveau joueur</span>
            </button>
          </div>
        </div>

        {/* Info banner */}
        
      </div>
    );
  }

  // Vue normale : gestion des équipes
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Mes équipes</h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>{teams.length} équipe{teams.length > 1 ? "s" : ""} dans votre club</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setManagingRoster(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
            style={{ background: "#04346D", color: "white", fontWeight: 600 }}
          >
            <Users className="w-4 h-4" />
            Gérer l'effectif du club
          </button>
          <button
            onClick={() => setShowAddTeam(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
            style={{ background: "#04346D" }}
          >
            <Plus className="w-4 h-4" />
            Ajouter une équipe
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Team list */}
        <div className="space-y-3">
          {teams.map((team) => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className="w-full rounded-2xl p-5 text-left transition-all hover:shadow-sm cursor-pointer"
              style={{
                background: selectedTeam.id === team.id ? "#04346D" : "white",
                border: `1.5px solid ${selectedTeam.id === team.id ? "#04346D" : "rgba(4,52,109,0.08)"}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                  style={{
                    background: selectedTeam.id === team.id ? "rgba(245,243,235,0.2)" : team.color + "20",
                    color: selectedTeam.id === team.id ? "white" : team.color,
                    fontWeight: 700,
                  }}
                >
                  <Shield className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate" style={{ color: selectedTeam.id === team.id ? "white" : "#04346D", fontWeight: 600 }}>
                    {team.name}
                  </p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: selectedTeam.id === team.id ? "rgba(245,243,235,0.6)" : "rgba(4,52,109,0.5)" }}>
                    {team.league}
                  </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setEditingTeamData(team);
                      setShowEditTeam(true);
                    }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                    style={{ background: selectedTeam.id === team.id ? "rgba(245,243,235,0.15)" : "rgba(4,52,109,0.06)" }}
                  >
                    <Pencil className="w-3 h-3" style={{ color: selectedTeam.id === team.id ? "rgba(245,243,235,0.8)" : "rgba(4,52,109,0.5)" }} />
                  </button>
                  <button
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setTeams(teams.filter(t => t.id !== team.id)); 
                      if (selectedTeam.id === team.id && teams.length > 1) setSelectedTeam(teams[0]); 
                    }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                    style={{ background: selectedTeam.id === team.id ? "rgba(245,243,235,0.15)" : "rgba(239,68,68,0.08)" }}
                  >
                    <Trash2 className="w-3 h-3" style={{ color: selectedTeam.id === team.id ? "rgba(245,243,235,0.8)" : "rgb(239,68,68)" }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team detail */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid rgba(4,52,109,0.07)" }}>
          {/* Header */}
          <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(4,52,109,0.06)", background: "rgba(4,52,109,0.02)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: selectedTeam.color }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 style={{ color: "#04346D", fontWeight: 700 }}>{selectedTeam.name}</h2>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(4,52,109,0.5)" }}>{selectedTeam.league}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingTeamData(selectedTeam);
                  setShowEditTeam(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:opacity-90"
                style={{ background: "rgba(4,52,109,0.06)", color: "#04346D", fontWeight: 600 }}
              >
                <Pencil className="w-4 h-4" />
                Modifier l'équipe
              </button>
            </div>
          </div>

          {/* Team info */}
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "rgba(4,52,109,0.03)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: selectedTeam.color }}>
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-1" style={{ color: "#04346D", fontWeight: 600 }}>Couleur de l'équipe</p>
                  <p className="text-xs" style={{ color: "rgba(4,52,109,0.6)" }}>Cette couleur sera utilisée seulement pour l'interface de l'application.</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-8 h-8 rounded-lg" style={{ background: selectedTeam.color, border: "2px solid rgba(4,52,109,0.1)" }} />
                    <span className="text-xs font-mono" style={{ color: "#04346D", fontWeight: 600 }}>{selectedTeam.color}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "rgba(4,52,109,0.03)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#04346D" }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-1" style={{ color: "#04346D", fontWeight: 600 }}>Championnat</p>
                  <p className="text-xs" style={{ color: "rgba(4,52,109,0.6)" }}>
                    {selectedTeam.league}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Team Modal */}
      {showAddTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(4,52,109,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "white" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: "#04346D", fontWeight: 700 }}>Ajouter une équipe</h3>
              <button onClick={() => setShowAddTeam(false)} style={{ color: "rgba(4,52,109,0.4)" }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Nom de l'équipe</label>
                <input type="text" placeholder="Ex: U18, Équipe B…" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }} />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Championnat</label>
                <input type="text" placeholder="Ex: Division Régionale 1…" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }} />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Couleur de l'équipe</label>
                <div className="flex items-center gap-3">
                  <input type="color" defaultValue="#04346D" className="w-16 h-12 rounded-xl cursor-pointer" style={{ border: "1.5px solid rgba(4,52,109,0.12)" }} />
                  <p className="text-xs flex-1" style={{ color: "rgba(4,52,109,0.6)" }}>Utilisée dans les visuels générés</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddTeam(false)} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}>Annuler</button>
              <button onClick={() => setShowAddTeam(false)} className="flex-1 py-3 rounded-xl text-sm text-white" style={{ background: "#04346D", fontWeight: 600 }}>Créer l'équipe</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {showEditTeam && editingTeamData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(4,52,109,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "white" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: "#04346D", fontWeight: 700 }}>Modifier l'équipe</h3>
              <button onClick={() => { setShowEditTeam(false); setEditingTeamData(null); }} style={{ color: "rgba(4,52,109,0.4)" }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Nom de l'équipe</label>
                <input 
                  type="text" 
                  defaultValue={editingTeamData.name} 
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none" 
                  style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }} 
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Championnat</label>
                <input 
                  type="text" 
                  defaultValue={editingTeamData.league} 
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none" 
                  style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }} 
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Couleur de l'équipe</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    defaultValue={editingTeamData.color} 
                    className="w-16 h-12 rounded-xl cursor-pointer" 
                    style={{ border: "1.5px solid rgba(4,52,109,0.12)" }} 
                  />
                  <p className="text-xs flex-1" style={{ color: "rgba(4,52,109,0.6)" }}>Utilisée seulement pour l'interface de l'application</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowEditTeam(false); setEditingTeamData(null); }} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}>Annuler</button>
              <button onClick={() => { setShowEditTeam(false); setEditingTeamData(null); }} className="flex-1 py-3 rounded-xl text-sm text-white" style={{ background: "#04346D", fontWeight: 600 }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Player Modal */}
      {showAddPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(4,52,109,0.4)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "white" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: "#04346D", fontWeight: 700 }}>Ajouter un joueur</h3>
              <button onClick={() => setShowAddPlayer(false)} style={{ color: "rgba(4,52,109,0.4)" }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full overflow-hidden cursor-pointer flex items-center justify-center" style={{ background: "#F5F3EB", border: "1.5px dashed rgba(4,52,109,0.2)" }}>
                <Camera className="w-5 h-5" style={{ color: "rgba(4,52,109,0.3)" }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: "#04346D", fontWeight: 500 }}>Photo du joueur</p>
                <p className="text-xs" style={{ color: "rgba(4,52,109,0.4)" }}>Optionnel — JPG, PNG</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Prénom</label>
                  <input type="text" placeholder="Lucas" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Nom</label>
                  <input type="text" placeholder="Martin" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }} />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#04346D", fontWeight: 500 }}>Catégorie d'âge</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#F5F3EB", border: "1.5px solid rgba(4,52,109,0.12)", color: "#04346D" }}>
                  <option>Senior</option>
                  <option>U18</option>
                  <option>U15</option>
                  <option>U13</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddPlayer(false)} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1.5px solid rgba(4,52,109,0.15)", color: "#04346D" }}>Annuler</button>
              <button onClick={() => setShowAddPlayer(false)} className="flex-1 py-3 rounded-xl text-sm text-white" style={{ background: "#04346D", fontWeight: 600 }}>Ajouter le joueur</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}