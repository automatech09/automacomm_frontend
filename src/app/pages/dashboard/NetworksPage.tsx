import { useState } from "react";
import { Instagram, Facebook, CheckCircle, AlertTriangle, RefreshCw, Unlink, ExternalLink, Zap } from "lucide-react";

interface NetworkState {
  instagram: {
    connected: boolean;
    username: string;
    followers: number;
    avatar: string;
    status: "active" | "expired" | "disconnected";
    connectedSince: string;
  };
  facebook: {
    connected: boolean;
    pageName: string;
    pageId: string;
    followers: number;
    status: "active" | "expired" | "disconnected";
    connectedSince: string;
  };
}

const initialState: NetworkState = {
  instagram: {
    connected: true,
    username: "@fcbeaumont_officiel",
    followers: 1240,
    avatar: "FC",
    status: "active",
    connectedSince: "12 janvier 2026",
  },
  facebook: {
    connected: true,
    pageName: "FC Beaumont — Football Club",
    pageId: "fc.beaumont.officiel",
    followers: 3200,
    status: "expired",
    connectedSince: "12 janvier 2026",
  },
};

function StatusBadge({ status }: { status: "active" | "expired" | "disconnected" }) {
  if (status === "active") {
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(15,155,88,0.1)", color: "#0F9B58", fontWeight: 600 }}>
        <CheckCircle className="w-3.5 h-3.5" />
        Connexion active
      </span>
    );
  }
  if (status === "expired") {
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(234,179,8,0.12)", color: "#B45309", fontWeight: 600 }}>
        <AlertTriangle className="w-3.5 h-3.5" />
        Connexion expirée
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(4,52,109,0.07)", color: "rgba(4,52,109,0.5)", fontWeight: 600 }}>
      Non connecté
    </span>
  );
}

export function NetworksPage() {
  const [networks, setNetworks] = useState<NetworkState>(initialState);
  const [reconnectingFb, setReconnectingFb] = useState(false);

  const disconnectInstagram = () => {
    setNetworks((n) => ({
      ...n,
      instagram: { ...n.instagram, connected: false, status: "disconnected" },
    }));
  };

  const reconnectInstagram = () => {
    setNetworks((n) => ({
      ...n,
      instagram: { ...n.instagram, connected: true, status: "active" },
    }));
  };

  const reconnectFacebook = () => {
    setReconnectingFb(true);
    setTimeout(() => {
      setNetworks((n) => ({
        ...n,
        facebook: { ...n.facebook, connected: true, status: "active" },
      }));
      setReconnectingFb(false);
    }, 1500);
  };

  const disconnectFacebook = () => {
    setNetworks((n) => ({
      ...n,
      facebook: { ...n.facebook, connected: false, status: "disconnected" },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 style={{ color: "#04346D", fontSize: "1.6rem", fontWeight: 700 }}>Mes réseaux sociaux</h1>
        <p className="mt-1 text-sm" style={{ color: "rgba(4,52,109,0.5)" }}>
          Gérez les connexions de vos comptes pour la publication automatique.
        </p>
      </div>

      {/* Instagram block */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: networks.instagram.status === "active" ? "1px solid rgba(4,52,109,0.07)" : networks.instagram.status === "expired" ? "1px solid rgba(234,179,8,0.3)" : "1px solid rgba(4,52,109,0.07)" }}>
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(4,52,109,0.06)", background: "rgba(4,52,109,0.015)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)" }}>
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <span style={{ color: "#04346D", fontWeight: 700 }}>Instagram</span>
          </div>
          <StatusBadge status={networks.instagram.status} />
        </div>

        <div className="p-6">
          {networks.instagram.connected ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              {/* Account info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #F58529, #DD2A7B)", color: "white", fontWeight: 700 }}>
                  {networks.instagram.avatar}
                </div>
                <div>
                  <p style={{ color: "#04346D", fontWeight: 700 }}>{networks.instagram.username}</p>
                  
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs" style={{ color: "#0F9B58" }}>Publications automatiques activées</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs transition-all hover:opacity-80"
                  style={{ background: "rgba(4,52,109,0.06)", color: "#04346D", fontWeight: 500, border: "1.5px solid rgba(4,52,109,0.1)" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Voir le compte
                </button>
                <button
                  onClick={disconnectInstagram}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs transition-all hover:opacity-80"
                  style={{ background: "rgba(239,68,68,0.07)", color: "#DC2626", fontWeight: 500, border: "1.5px solid rgba(239,68,68,0.15)" }}
                >
                  <Unlink className="w-3.5 h-3.5" />
                  Déconnecter
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(4,52,109,0.05)" }}>
                <Instagram className="w-7 h-7" style={{ color: "rgba(4,52,109,0.3)" }} />
              </div>
              <div className="text-center">
                <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Compte non connecté</p>
                <p className="text-xs mt-1" style={{ color: "rgba(4,52,109,0.5)" }}>Connectez votre compte Instagram pour activer les publications automatiques.</p>
              </div>
              <button
                onClick={reconnectInstagram}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #F58529, #DD2A7B)" }}
              >
                <Instagram className="w-4 h-4" />
                Connecter Instagram
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Facebook block */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "white",
          border: networks.facebook.status === "active"
            ? "1px solid rgba(4,52,109,0.07)"
            : networks.facebook.status === "expired"
            ? "1px solid rgba(234,179,8,0.3)"
            : "1px solid rgba(4,52,109,0.07)",
        }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(4,52,109,0.06)", background: "rgba(4,52,109,0.015)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#1877F2" }}>
              <Facebook className="w-5 h-5 text-white" />
            </div>
            <span style={{ color: "#04346D", fontWeight: 700 }}>Facebook</span>
          </div>
          <StatusBadge status={networks.facebook.status} />
        </div>

        <div className="p-6">
          {networks.facebook.connected ? (
            <>
              {networks.facebook.status === "expired" && (
                <div className="mb-5 rounded-xl p-4 flex items-start gap-3" style={{ background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.25)" }}>
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#B45309" }} />
                  <div>
                    <p className="text-sm" style={{ color: "#B45309", fontWeight: 600 }}>Connexion expirée</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(180,83,9,0.75)", lineHeight: 1.5 }}>
                      Le token d'accès Facebook a expiré. Reconnectez votre page pour rétablir les publications automatiques.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                {/* Page info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{ background: "#1877F2", color: "white", fontWeight: 700 }}>
                    FC
                  </div>
                  <div>
                    <p style={{ color: "#04346D", fontWeight: 700 }}>{networks.facebook.pageName}</p>
                    
                    
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                  <button
                    onClick={reconnectFacebook}
                    disabled={reconnectingFb}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs transition-all hover:opacity-90"
                    style={{ background: "#04346D", color: "white", fontWeight: 500 }}
                  >
                    {reconnectingFb ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="w-3.5 h-3.5" />
                    )}
                    {reconnectingFb ? "Reconnexion..." : "Modifier connexion"}
                  </button>
                  <button
                    onClick={disconnectFacebook}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs transition-all hover:opacity-80"
                    style={{ background: "rgba(239,68,68,0.07)", color: "#DC2626", fontWeight: 500, border: "1.5px solid rgba(239,68,68,0.15)" }}
                  >
                    <Unlink className="w-3.5 h-3.5" />
                    Déconnecter
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-6 gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(4,52,109,0.05)" }}>
                <Facebook className="w-7 h-7" style={{ color: "rgba(4,52,109,0.3)" }} />
              </div>
              <div className="text-center">
                <p className="text-sm" style={{ color: "#04346D", fontWeight: 600 }}>Page non connectée</p>
                <p className="text-xs mt-1" style={{ color: "rgba(4,52,109,0.5)" }}>Connectez votre page Facebook pour activer les publications automatiques.</p>
              </div>
              <button
                onClick={reconnectFacebook}
                disabled={reconnectingFb}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                style={{ background: "#1877F2" }}
              >
                {reconnectingFb ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Facebook className="w-4 h-4" />}
                {reconnectingFb ? "Connexion..." : "Connecter une page Facebook"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Coming soon */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(4,52,109,0.03)", border: "1.5px dashed rgba(4,52,109,0.15)" }}>
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-4 h-4" style={{ color: "rgba(4,52,109,0.4)" }} />
          <span className="text-sm" style={{ color: "rgba(4,52,109,0.5)", fontWeight: 600 }}>Prochainement</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {["X (Twitter)", "TikTok", "LinkedIn"].map((net) => (
            <div key={net} className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(4,52,109,0.05)", border: "1px solid rgba(4,52,109,0.08)" }}>
              <span className="text-sm" style={{ color: "rgba(4,52,109,0.45)" }}>{net}</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(4,52,109,0.06)", color: "rgba(4,52,109,0.4)" }}>Bientôt</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
