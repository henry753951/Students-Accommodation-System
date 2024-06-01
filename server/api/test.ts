import * as jose from "jose";
import { useAuth } from "../utils/useAuth";
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

export default defineEventHandler(async (event) => {
  const data = await useAuth(event, ["students"]);
  if (!data) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }
  return {
    status: 200,
    body: `Hello  ${data.user.user_metadata.full_name}!`,
  };
});
