export type SocialNetwork = "instagram" | "facebook";

export interface ConnectedAccount {
  id: string;
  network: SocialNetwork;
  accountName: string;
  followers: number;
  isActive: boolean;
  connectedSince: string;
}

export type ConnectionStatus = "active" | "expired" | "disconnected";

export type NetworkState = {
  instagram: {
    connected: boolean;
    username: string;
    avatar: string;
    urlAccount?: string;
    status: ConnectionStatus;
    connectedSince: string;
  };
  facebook: {
    connected: boolean;
    pageName: string;
    urlAccount?: string;
    status: ConnectionStatus;
    connectedSince: string;
  };
};

export interface NetworkCardProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  border: string;
  status: ConnectionStatus;
  connected: boolean;
  main: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onReconnect: () => void;
  reconnecting?: boolean;
  showExpiredAlert?: boolean;
  showViewButton?: boolean;
  disconnectedText: string;
  connectLabel: string;
}
