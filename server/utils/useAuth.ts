import { serverSupabaseSession } from "#supabase/server";
import { getRoles } from "./getRoles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function useAuth(event: any, roles: Array<"student" | "teacher" | "landlord"> = []) {
  type Session = Exclude<Awaited<ReturnType<typeof serverSupabaseSession>>, null>;
  const session = await serverSupabaseSession(event) as Session;
  if (!session) {
    await event.respondWith({
      status: 401,
      body: "Unauthorized",
    });
  }
  const user_roles = await getRoles(event, session.user.id);
  if (roles.length && !roles.some((role) => user_roles.includes(role))) {
    await event.respondWith({
      status: 403,
      body: "Forbidden",
    });
  }
  return {
    session,
    roles: user_roles
  };
}
