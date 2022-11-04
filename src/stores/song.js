// /store/user.js
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useSongStore = defineStore("song", {
  state: () => ({
    song: [],
  }),

  actions: {
    async getAllSongs() {
        const { data: songs, error } = await supabase.from('song').select('*').order('id');
        if (error) {
            return 'Error: ' + error.message;
        } else {
          if (songs === null) {
            this.song = [];
          }

          this.song = songs;
        }
        
    },
    async saveSong(song) {
        const { data, error } = await supabase.from('song').insert(song).single();
        if (error) {
            return 'Error: ' + error.message;
        }
        
        return data;
    },
    async getSongByUrl(url) {
        const { data, error } = await supabase.from('song').select('*').eq('url', url).single();
        if (error) {
            return 'Error: ' + error.message;
        }
        
        return data;
    },
    async getSongById(id) {
      const { data, error } = await supabase.from('song').select('*').eq('id', id).single();
        if (error) {
            return 'Error: ' + error.message;
        }
        
        return data;
    }
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
