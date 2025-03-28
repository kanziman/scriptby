import { fetchWrapper } from "../utils/helpers";

export async function postNaverLogIn() {
  console.log("post naver login called");
  if (!window.location.hash) return null;
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");

  const url = "/api/auth/callback/naver";

  const data = await fetchWrapper(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
  });
  console.log("data:", data);
  return data;
}
