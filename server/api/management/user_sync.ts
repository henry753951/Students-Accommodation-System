import { serverSupabaseServiceRole } from "#supabase/server";
import type { Database } from "~/database.types";
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole<Database>(event);
  const {
    data: { users },
  } = await supabase.auth.admin.listUsers();

  for (const user of users) {
    const app_user = await supabase.from("app_user").select("*").eq("id", user.id).single();
    if (app_user) {
      const other = {
        name: app_user.data?.name || user.app_metadata.full_name || undefined,
        phone: app_user.data?.phone || user.app_metadata.phone || undefined,
      };
      await supabase.from("app_user").update({
        email: user.email,
        ...other,
      });
    } else {
      await supabase.from("app_user").insert({
        email: user.email,
        name: user.app_metadata.full_name || undefined,
        phone: user.app_metadata.phone || undefined,
      });
    }

    return {
      status: 200,
      body: {
        message: "User sync successful",
      },
    };
  }
});
