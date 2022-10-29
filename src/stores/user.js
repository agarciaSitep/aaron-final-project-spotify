// /store/user.js
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, session, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (error) return error.message;
      if (user) {this.user = user; return 'ok'}
    },
    async signIn(email, password) {
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      })
      if (error) return error.message;
      if (user) {this.user = user; return 'ok'}
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
