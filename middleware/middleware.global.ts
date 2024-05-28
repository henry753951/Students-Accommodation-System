import routes from "./routes";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const route = routes.find((route) => {
    const regex = new RegExp(
      `^${route.path
        .replace(/\//g, "\\/") // Escape forward slashes
        .replace(/:\w+/g, "[^/]+") // Replace route parameters with regex pattern
        .replace(/\*/g, ".*")}$`,
    ); // Replace wildcard with regex pattern to match any sequence
    return regex.test(to.path);
  });
  // Check is route is protected
  if (route) {
    // Check if user is authenticated
    const user = useSupabaseUser().value;

    // 若是沒有設定 role 就是有登入就放行
    if (!route.role) {
      if (user) {
        return true;
      }
      return false;
    }

    // 若是有設定 unauthenticated 尚未登入的使用者就直接放行
    if (route.role.includes("unauthenticated") && !user) {
      return true;
    }
    // 已登入的使用者 role 符合就放行
    if (user && user.role && route.role.includes(user.role)) {
      return true;
    } else {
      if (route.role.includes("unauthenticated")) {
        return navigateTo("/");
      }
      return navigateTo("/auth/login");
    }
  }
  return true;
});
