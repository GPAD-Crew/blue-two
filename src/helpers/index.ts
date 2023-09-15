export { default as env } from "./env";
export { qs } from "./qs";

export const safeFilter = <T>(array: (T | undefined | null)[]): T[] =>
    array.filter(Boolean) as T[];
