import { serverSupabaseServiceRole } from "#supabase/server";
import type { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  type Session = Exclude<Awaited<ReturnType<typeof useAuth>>, null>;
  const data = await useAuth(event, []) as Session;
  const supabase = serverSupabaseServiceRole<Database>(event);
  const roleHandlers = {
    學生: async (data: Session) => {
      const email = data.user.email;
      const isNUKStudent = email?.endsWith("@mail.nuk.edu.tw");
      await supabase.from("student").upsert({
        user_id: data.user.id,
        student_number: isNUKStudent ? email?.split("@")[0] : undefined,
      });
      return isNUKStudent;
    },
    教師: async (data: Session) => {
      const email = data.user.email;
      const isNUKTeacher = true;
      if (isNUKTeacher) {
        await supabase.from("teacher").upsert({
          user_id: data.user.id,
          // department_id: "",
        });
      }
      return isNUKTeacher;
    },
    房東: async (data: Session) => {
      await supabase.from("landlord").upsert({
        user_id: data.user.id,
      });
      return true;
    }
  };
  type Body = {
    roles: [
      {
        name: string;
        selected: boolean;
      },
    ];
  };

  const body: Body = (await readBody(event)) as Body;
  const selectedRoles = body.roles.filter((role) => role.selected);
  let isValid = true;
  for (const role of selectedRoles) {
    const handler = roleHandlers[role.name as keyof typeof roleHandlers];
    if (handler && (await handler(data))) {
      isValid = false;
      break;
    }
  }

  if (!isValid) {
    return new Response("Invalid role", {
      status: 400,
    });
  }
  // do something

  return {
    message: "Hello World",
  };
});
