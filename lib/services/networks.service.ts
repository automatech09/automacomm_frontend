import { NETWORKS } from "@/lib/constants/dashboardData";
import type { ConnectedAccount, SocialNetwork } from "@/types";

export const networksService = {
  async getConnectedAccounts(): Promise<ConnectedAccount[]> {
    return Promise.resolve(NETWORKS);
  },
  async connectAccount(network: SocialNetwork): Promise<ConnectedAccount> {
    return Promise.resolve({
      id: crypto.randomUUID(),
      network,
      accountName: `@mock_${network}`,
      followers: 0,
      isActive: true,
      connectedSince: new Date().toLocaleDateString("fr-FR"),
    });
  },
};
