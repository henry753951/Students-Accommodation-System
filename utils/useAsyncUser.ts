import type { Database, Tables, Enums } from "~/database.types";

export default async () => {
  const userStore = useUserStore();

  const supabase = useSupabaseClient<Database>();
  const user = useSupabaseUser();
  const { user: a_user } = storeToRefs(userStore);
  if (!user.value) {
    userStore.setUser(null);
    return a_user;
  }
  if (import.meta.server) {
    const p = supabase
      .from("app_user")
      .select("*, student(*), teacher(*), landlord(*),admin(*)")
      .eq("id", user.value.id)
      .single()
      .then(({ data: user_data, error }) => {
        if (error || !user_data) {
          userStore.setUser(null);
          return;
        }
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
      });

    await p;
  }
  return a_user;
};
