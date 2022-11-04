// /store/user.js
import { defineStore } from "pinia";

export const useIsPlayingStore = defineStore("isPlaying", {
  state: () => ({
    isPlaying: null,
  }),

  actions: {
    async playSong(url) {
        if (url !== null && url !== undefined && url !== '') this.isPlaying = url;
    },    
    async getActualSong() {
        return this.isPlaying;
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "isPlaying",
        storage: localStorage,
      },
    ],
  },
});
