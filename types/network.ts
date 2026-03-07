export type SocialNetwork = "instagram" | "facebook";

export interface ConnectedAccount {
  id: string;
  network: SocialNetwork;
  accountName: string;
  followers: number;
  isActive: boolean;
  connectedSince: string;
}
