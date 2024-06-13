import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "UserStore",
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user_data: User | null) {
      this.user = user_data;
    },
  },
  getters: {},
});

interface User {
  roles: string[];
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
}
