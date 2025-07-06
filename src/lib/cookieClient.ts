import { getCookie } from "cookies-next";

export function getCookieClient() {
  const accessToken = getCookie("session");
  return accessToken || null;
}