import supabase from "../services/supabase";

export async function recordVisit() {
  const res = await supabase.from("visits").insert([
    {
      ip_address: await getIpAddress(), // 선택
      user_agent: navigator.userAgent,
    },
  ]);
  return res;
}

// 외부 IP 가져오기 (MyIP API 활용)
async function getIpAddress() {
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch (err) {
    return "unknown";
  }
}
export async function getTodayVisitCount() {
  const start = new Date();
  start.setHours(0, 0, 0, 0); // 오늘 00:00:00

  const { count, error } = await supabase
    .from("visits")
    .select("*", { count: "exact", head: true })
    .gte("created_at", start.toISOString());

  return { count, error };
}
