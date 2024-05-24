import { defineStore } from "pinia";
// get type from function

export const useUserStore = defineStore({
  id: "UserStore",
  state: () => ({
    user: useSupabaseUser().value,
  }),
  actions: {},
});
