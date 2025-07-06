import { cookies } from "next/headers";

export async function getCookieServer() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("session")?.value;
  return accessToken || null;
}
