import { serverSupabaseServiceRole } from "#supabase/server";
import type { Database } from "~/database.types";
import { getRoles } from "~/server/utils/getRoles";

export default defineEventHandler(async (event) => {
  // 初始化 Supabase 服務
  const supabase = serverSupabaseServiceRole<Database>(event);

  // 從 Supabase 管理員列表中獲取所有用戶
  const {
    data: { users },
  } = await supabase.auth.admin.listUsers();

  // 遍歷所有用戶
  for (const user of users) {
    // 從 'app_user' 表中獲取用戶數據
    const app_user = await supabase.from("app_user").select("*").eq("id", user.id).single();

    if (app_user) {
      // 組合用戶數據
      const other = {
        name: app_user.data?.name || user.user_metadata.full_name || undefined,
        phone: app_user.data?.phone || user.user_metadata.phone || undefined,
        avatar_url: app_user.data?.avatar_url || user.user_metadata.avatar_url || undefined,
      };
      // 更新 'app_user' 表中的用戶數據
      await supabase.from("app_user").update({
        email: user.email,
        ...other,
      }).eq("id", user.id);
      console.log("User sync successful", other);
      // 獲取用戶角色
      const user_roles = await getRoles(event, user.id);

      // 如果用戶是學生，則處理學號
      if (user_roles.includes("student")) {
        if (user.email?.endsWith("@mail.nuk.edu.tw")) {
          await supabase.from("student").upsert({
            user_id: user.id,
            student_number: user.email?.split("@")[0],
          });
        }
      }
    }
  }

  // 返回同步成功的狀態和信息
  return {
    status: 200,
    body: {
      message: "User sync successful",
    },
  };
});
