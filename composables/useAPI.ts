import type { UseFetchOptions } from 'nuxt/app';

export function useAPI<T>(
  url: string | (() => string),
  options: Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> },
) {
  const headers = {
    ...useRequestHeaders(['cookie'])
  };
  return useFetch(url, {
    headers,
    ...options,
    $fetch: useNuxtApp().$api
    
  });
}