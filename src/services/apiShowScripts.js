import supabase from "./supabase";

/// ADD SCRIPT(with show)
export async function createShowAndScript({ newScript, show }) {
  console.log("call");
  console.log("insert newScript:", newScript);
  console.log("insert show:", show);

  try {
    // A) Upsert tv: 같은 id가 있으면 update, 없으면 insert
    const { data: upsertedTv, error: tvError } = await supabase
      .from("tvs")
      .upsert(show, { onConflict: ["show_id", "category"] })
      .select()
      .single();

    if (tvError) {
      console.error("TV upsert error:", tvError);
      throw new Error("TV could not be upserted");
    }

    // B) newScript에 tv_id를 병합
    const scriptData = { ...newScript, tv_id: upsertedTv.id };

    // C) INSERT script
    const { data: insertedScript, error: scriptError } = await supabase
      .from("scripts")
      .insert(scriptData)
      .select()
      .single();

    if (scriptError) {
      console.error("Script insertion error:", scriptError);
      throw new Error("Script could not be created");
    }

    return { newScript: insertedScript, show: upsertedTv };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to create associated data");
  }
}

/// UPDATE SCRIPT
export async function updateShowAndScript({ newScript, show }) {
  console.log("update updatedScript:", newScript);
  console.log("update show:", show);

  try {
    // A) Upsert tv: 같은 id가 있으면 업데이트, 없으면 삽입 (tvs 테이블 사용)
    const { data: updatedTv, error: tvError } = await supabase
      .from("tvs")
      .upsert(show, { onConflict: ["show_id", "category"] })
      .select()
      .single();

    if (tvError) {
      console.error("TV upsert error:", tvError);
      throw new Error("TV could not be updated");
    }
    console.log("UPDATE COMPLETE updatedTv:>> ", updatedTv);

    // B) newScript에 tv_id를 병합한 후 스크립트 업데이트 (업데이트 시 newScript에는 id가 포함되어야 함)
    const scriptData = { ...newScript, tv_id: updatedTv.id };
    console.log("UPDATE B FINISH scriptData:>> ", scriptData);

    const { data: updatedScriptData, error: scriptError } = await supabase
      .from("scripts")
      .update(scriptData)
      .eq("id", newScript.id)
      .select()
      .single();

    if (scriptError) {
      console.error("Script update error:", scriptError);
      throw new Error("Script could not be updated");
    }
    console.log("UPDATE FINISH scriptData:>> ", scriptData);

    return { updatedScript: updatedScriptData, tv: updatedTv };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to update associated data");
  }
}

export async function getScriptsByShowId({ filter, sortBy, page }) {
  let query;
  query = supabase
    .from("scripts")
    .select(
      `
    *,
    user:profiles!user_id(*)
  `,
      { count: "exact" }
    )
    .order("season_number", { ascending: true }) // 시즌 번호 오름차순
    .order("episode_number", { ascending: true }) // 에피소드 번호 오름차순
    .order("created_at", { ascending: true }); // 생성 날짜 오름차순

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Scripts could not be loaded");
  }

  return { data, count };
}
