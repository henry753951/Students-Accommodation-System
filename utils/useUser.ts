import type { Database, Tables, Enums } from "~/database.types";

export default () => {
  const userStore = useUserStore();
  const supabase = useSupabaseClient<Database>();
  const user = useSupabaseUser();
  const { user: a_user } = storeToRefs(userStore);
  let done = false;
  if (!user.value) {
    userStore.setUser(null);
    return a_user;
  }
  const promise = supabase
    .from("app_user")
    .select("*, student(*), teacher(*), landlord(*),admin(*)")
    .eq("id", user.value.id)
    .single()
    .then(({ data: user_data, error }) => {
      if (error || !user_data) {
        userStore.setUser(null);
        done = true;
        return;
      }
      // console.log("[User] user_data refresh", user_data);
      userStore.setUser({
        roles: [],
        id: user_data.id,
        name: user_data.name,
        email: user_data.email,
        phone: user_data.phone,
      });
      if (user_data.student) {
        userStore.user!.roles.push("student");
      }
      if (user_data.teacher) {
        userStore.user!.roles.push("teacher");
      }
      if (user_data.landlord) {
        userStore.user!.roles.push("landlord");
      }
      if (user_data.admin) {
        userStore.user!.roles.push("admin");
      }
      done = true;
    });
  return a_user;
};
