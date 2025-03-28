import supabase, { supabaseUrl } from "./supabase";
export async function createPostApi(post) {
  console.log(JSON.stringify(post));
  try {
    // A) Upsert show: 같은 id가 있으면 update, 없으면 insert
    const { data: insertedPost, error: showError } = await supabase
      .from("posts")
      .insert(post)
      .select()
      .single();

    if (showError) {
      console.error("Show upsert error:", showError);
      throw new Error("Show could not be upserted");
    }

    return { post: insertedPost };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to create associated data");
  }
}
export async function updatePostApi(post) {
  // console.log(JSON.stringify(post));
  console.log(post);
  try {
    const { data, error } = await supabase
      .from("posts")
      .update(post)
      .eq("id", post.id)
      .select()
      .single();

    if (error) {
      console.error("post update error:", error);
      throw new Error("Post could not be upserted");
    }

    return { post: data };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to create associated data");
  }
}

/// GET
export async function getPostById(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*,  profile:profiles(email,username,avatar_url)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Post could not be loaded");
  }

  // 2. 조회수를 +1 업데이트
  const newViewCount = (data.view || 0) + 1;
  const { error: updateError } = await supabase
    .from("posts")
    .update({ view: newViewCount })
    .eq("id", id);

  if (updateError) {
    console.error(updateError);
    throw new Error("View count could not be updated");
  }

  const newData = { ...data, view: newViewCount };

  return newData;
}

/// GET ALL
export async function getPosts() {
  const { data, count, error } = await supabase
    .from("posts")
    .select("*, profile:profiles(email,username)", {
      count: "exact",
    })
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Posts could not be loaded");
  }
  return { data, count };
}
/// GET ALL & FILTERING
export async function getPostsWithFilter() {
  const { data, count, error } = await supabase
    .from("posts")
    .select("*, profile:profiles(email,username)", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Posts could not be loaded");
  }

  // notice 글과 일반 글을 필터링
  const noticePosts = data.filter((post) => post.type === "notice");
  const generalPosts = data.filter((post) => post.type !== "notice");

  // notice 글을 위쪽에, 일반 글을 아래쪽에 배치

  return { data: { noticePosts, generalPosts }, count };
}

/// DELETE BY ID
export async function deletePostById(id) {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("post could not be deleted");
  }

  return data;
}

export async function uploadImage(file, isThumb) {
  if (!file) {
    console.error("No file provided");
    return "";
  }

  // 현재 연도와 월을 가져와 문자열로 만듭니다.
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  console.log("file :>> ", file);
  // 파일 확장자 추출 및 고유 파일명 생성
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  // 파일 경로: 예) "2025/03/1682501234567.png"
  const filePath = isThumb
    ? `thumb/${year}${month}/${fileName}`
    : `${year}${month}/${fileName}`;

  // Supabase 스토리지의 "images" 버킷에 파일 업로드 (폴더 구조 포함)
  const { data, error: storageError } = await supabase.storage
    .from("images")
    .upload(filePath, file);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/images/${filePath}`;

  return imageUrl;
}
