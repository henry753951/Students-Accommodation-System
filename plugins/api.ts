export default defineNuxtPlugin(async () => {
  const api = $fetch.create({
    async onRequest({ request, options, error }) {
      const { csrf } = useCsrf();
      const supabase = useSupabaseClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const headers = (options.headers ||= {});
      if (Array.isArray(headers)) {
        if (session && session.access_token) headers.push(["Authorization", `Bearer ${session.access_token}`]);
        headers.push(["Csrf-Token", csrf]);
      } else if (headers instanceof Headers) {
        if (session && session.access_token) headers.set("Authorization", `Bearer ${session.access_token}`);
        headers.set("Csrf-Token", csrf);
      } else {
        if (session && session.access_token) headers.Authorization = `Bearer ${session.access_token}`;
        headers["Csrf-Token"] = csrf;
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await navigateTo("/auth/login");
      }
    },
  });
  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
