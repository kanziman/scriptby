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
export async function updateShowAndScript({ newScript }) {
  console.log("update updatedScript:", newScript);

  try {
    const scriptData = {
      ...newScript,
      updated_at: new Date().toISOString(), // 현재 시간으로 업데이트
    };

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

    return { updatedScript: updatedScriptData };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to update associated data");
  }
}
