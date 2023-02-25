import { defineStore } from "pinia";

interface WalletData {
  address: string;
  // acc_short: string;
  signer: object;
  provider: object;
}

export const useWalletStore = defineStore("wallet", {
  state: () => {
    return {
      address: "",
      provider: {},
      acc_short: "",
      signer: {},
    };
  },

  actions: {
    //@ts-ignore
    saveWalletData(payload: WalletData) {
      this.address = payload.address;
      this.acc_short = `${payload.address.slice(
        0,
        2
      )}...${payload.address.slice(-4)}`;
      this.provider = payload.provider;
      // @ts-ignore
      this.signer = payload.signer;
    },
  },
});
