// /store/user.js
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const usePlaylistStore = defineStore("playlist", {
  state: () => ({
    playlist: [],
  }),

  actions: {
    async getPlaylist(user_id) {
        const { data: songs, error } = await supabase.from('playlist').select('*').eq('user_id', user_id);
        if (error) {
            return 'Error: ' + error.message;
        }
        if (songs === null) {
            this.playlist = [];
        }

        this.playlist = songs;
        return songs;
    },
    async addSongToPlaylist(playlist) {
        const { data, error } = await supabase.from('playlist').insert(playlist).single();
        if (error) {
            return 'Error: ' + error.message;
        }
        
        return data;
    },
    async deleteSongFromPlaylist(user_id, song_id) {
        const { data, error } = await supabase.from('song').delete('*').eq('user_id', user_id).eq('song_id', song_id);
        if (error) {
            return 'Error: ' + error.message;
        }
        
        return data;
    },
    async checkSongIsAlreadyAdded(user_id, song_id) {
      const { data: song, error } = await supabase.from('playlist').select('*').eq('user_id', user_id).eq('song_id', song_id);

      if (error) {
        return 'Error: ' + error.message;
      }
      return song;
    }
    
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "playlist",
        storage: localStorage,
      },
    ],
  },
});
