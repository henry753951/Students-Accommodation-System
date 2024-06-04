import { serverSupabaseServiceRole } from "#supabase/server";
import type { Database } from "~/database.types";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRoles(event: any, user_id: string) {
  const supabase = serverSupabaseServiceRole<Database>(event);
  const user_roles: Array<"student" | "teacher" | "landlord"> = [];

  const user = await supabase.from("app_user").select("*,student(*),teacher(*),landlord(*)").eq("id", user_id).single();
  if (user) {
    if (user.data?.student) {
      user_roles.push("student");
    }
    if (user.data?.teacher) {
      user_roles.push("teacher");
    }
    if (user.data?.landlord) {
      user_roles.push("landlord");
    }
  }
  return user_roles;
}
