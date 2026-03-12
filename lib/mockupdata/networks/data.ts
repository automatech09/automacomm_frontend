import type { NetworkState } from "@/types";

export const initialNetworks: NetworkState = {
  instagram: {
    connected: true,
    username: "@fcbeaumont_officiel",
    avatar: "FC",
    status: "active",
    connectedSince: "12 janvier 2026",
  },
  facebook: {
    connected: true,
    pageName: "FC Beaumont — Football Club",
    status: "expired",
    connectedSince: "12 janvier 2026",
  },
};

export const soonNetworks = ["X (Twitter)", "TikTok", "LinkedIn"];
