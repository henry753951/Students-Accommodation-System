import type { Json } from "~/database.types";

export default function getJson<T>(data: Json, defaultValue: T): T {
  if (!data) return defaultValue;
  return JSON.parse(JSON.stringify(data)) as unknown as T;
}
