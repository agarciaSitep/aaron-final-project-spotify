// /store/user.js
import { defineStore } from "pinia";

export const useIsPlaylistStore = defineStore("isPlaylist", {
  state: () => ({
    isPlaylist: true,
  }),

  actions: {
    async onChangeMainPage(isPlaylist) {
      this.isPlaylist = isPlaylist;
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "isPlaylist",
        storage: localStorage,
      },
    ],
  },
});
