// /store/user.js
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const usePlaylistFeatures = defineStore("playlist_features", {
  state: () => ({
    features: null,
  }),

  actions: {
    async fetchFeatures(user_id) {
        const { data, error } = await supabase.from('playlist_features').select('*').eq('user_id', user_id).single();
        if (error) {
            this.features = null;
            return 'Error: ' + error.message;
        }
        else this.features = data;
    },
    async editPicture(picture, id) {
        const { data, error } = await supabase.from('playlist_features').update({picture: picture}).eq('id', id)
    },
    async createPlaylist(user_id) {
        let obj = {
            user_id: user_id,
            name: 'Tu playlist'
        }
        const { data, error } = await supabase.from('playlist_features').insert(obj).single();

        if (error) {
            return 'Error: ' + error.message;
        } else this.features = data;
        return data;
    },
    async editName(name, id) {
      const { data, error } = await supabase.from('playlist_features').update({name: name}).eq('id', id).single();

      if (error) {
        return 'Error: ' + error.message;
      } else this.features = data;
      return data;
  },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
