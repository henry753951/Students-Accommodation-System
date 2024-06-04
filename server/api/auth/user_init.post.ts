import { serverSupabaseServiceRole } from "#supabase/server";
import type { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  // 定義 Session 類型
  type Session = Awaited<ReturnType<typeof useAuth>>["session"];

  // 獲取認證數據
  const data = (await useAuth(event, [])).session;

  // 初始化 Supabase 服務
  const supabase = serverSupabaseServiceRole<Database>(event);

  // 定義角色處理器
  const roleHandlers = {
    學生: async (data: Session) => {
      const email = data.user.email;
      const isNUKStudent = email?.endsWith("@mail.nuk.edu.tw");

      // 插入或更新 'student' 表中的數據
      await supabase.from("student").upsert({
        user_id: data.user.id,
        student_number: isNUKStudent ? email?.split("@")[0] : undefined,
      });

      return isNUKStudent;
    },
    教師: async (data: Session) => {
      const email = data.user.email;
      const isNUKTeacher = true; // 假設此處是檢查教師身份的邏輯

      if (isNUKTeacher) {
        // 插入或更新 'teacher' 表中的數據
        await supabase.from("teacher").upsert({
          user_id: data.user.id,
          // department_id: "", // 此處可以添加部門 ID
        });
      }

      return isNUKTeacher;
    },
    房東: async (data: Session) => {
      // 插入或更新 'landlord' 表中的數據
      await supabase.from("landlord").upsert({
        user_id: data.user.id,
      });

      return true;
    },
  };

  // 定義 Body 類型
  type Body = {
    roles: [
      {
        name: string;
        selected: boolean;
      }
    ];
  };

  // 讀取請求體中的數據
  const body: Body = (await readBody(event)) as Body;

  // 選取被選中的角色
  const selectedRoles = body.roles.filter((role) => role.selected);

  // 驗證角色處理
  let isValid = true;
  for (const role of selectedRoles) {
    const handler = roleHandlers[role.name as keyof typeof roleHandlers];
    if (handler && (await handler(data))) {
      isValid = false;
      break;
    }
  }

  // 如果無效角色，返回錯誤響應
  if (!isValid) {
    return new Response("Invalid role", {
      status: 400,
    });
  }

  // 可以在此處添加其他操作

  // 返回成功信息
  return {
    message: "Hello World",
  };
});
