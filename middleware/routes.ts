export default [
  {
    // name of the route
    name: "example",
    // regex to match the route
    path: "",
    // method to match the route (Optional if not provided it will match all methods)
    method: "GET",
    // role to match the route (Optional if not provided it will match all roles)
    role: ["admin", "user"],
  },
  {
    name: "login",
    path: "/auth/login/*",
    role: ["unauthenticated"],
  },
  {
    name: "changePassword",
    path: "/auth/changePassword",
  },
  {
    name: "account",
    path: "/account/*",
  },
  {
    name: "management",
    path: "/management/*",
    role: ["admin"],
  },
];
