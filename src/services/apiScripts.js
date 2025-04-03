import { v4 as uuidv4 } from "uuid";
import supabase, { supabaseUrl } from "./supabase";

/// GET ALL
// export async function getScripts() {
//   const { data, count, error } = await supabase
//     .from("scripts")
//     .select("*, show:tvs(*), profile:profiles(email,username)", {
//       count: "exact",
//     });

//   if (error) {
//     console.error(error);
//     throw new Error("Scripts could not be loaded");
//   }
//   return { data, count };
// }

/// GET ALL WITH FILTER
export async function getScriptsWithFilter({ filter, sortBy, page, size }) {
  // 1. 전체 행수(count)를 조회하기 위한 베이스 쿼리 생성
  let baseQuery = supabase
    .from("scripts")
    .select("*, tv:tvs(*), profile:profiles(email,username)", {
      count: "exact",
    });

  if (filter) {
    baseQuery = baseQuery[filter.method || "eq"](filter.field, filter.value);
  }

  if (sortBy) {
    baseQuery = baseQuery.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  // 2. count만 먼저 가져옴
  const { count, error: countError } = await baseQuery;
  if (countError) {
    console.error(countError);
    throw new Error("Scripts could not be loaded (count error)");
  }

  const totalCount = count;
  const pageCount = Math.ceil(totalCount / size);
  // 요청한 페이지가 전체 페이지 수보다 크면 마지막 페이지로 보정
  const currentPage = page > pageCount ? pageCount : page;
  const from = (currentPage - 1) * size;
  // 마지막 페이지의 경우 to 값은 totalCount - 1, 그 외는 from + size - 1
  const to = currentPage === pageCount ? totalCount - 1 : from + size - 1;

  // 3. 동일한 조건으로 range를 적용하여 실제 데이터를 조회
  let query = supabase
    .from("scripts")
    .select("*, tv:tvs(*), profile:profiles(email,username)", {
      count: "exact",
    });

  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Scripts could not be loaded (data error)");
  }

  return { data, count };
}
/// GET ALL WITH FILTER
export async function getScriptsWithFilterV1({
  filter,
  sortBy,
  page,
  size,
  query,
  signal,
}) {
  // 1. 전체 행수(count)를 조회하기 위한 베이스 쿼리 생성
  let baseQuery = supabase
    .from("scripts")
    .select("*, tv:tvs(*), profile:profiles(email,username)", {
      count: "exact",
      signal, // abort signal 전달
    });

  if (filter) {
    if (Array.isArray(filter)) {
      filter.forEach((f) => {
        baseQuery = baseQuery[f.method || "eq"](f.field, f.value);
      });
    } else {
      baseQuery = baseQuery[filter.method || "eq"](filter.field, filter.value);
    }
  }

  // 검색어(query)가 있을 경우 original_name 필드에 대해 대소문자 구분 없이 검색 적용
  if (query) {
    baseQuery = baseQuery.ilike("original_name", `%${query}%`);
  }

  if (sortBy) {
    baseQuery = baseQuery.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  // 2. count만 먼저 가져옴
  const { count, error: countError } = await baseQuery;
  if (countError) {
    console.error(countError);
    throw new Error("Scripts could not be loaded (count error)");
  }

  const totalCount = count;
  const pageCount = Math.ceil(totalCount / size);
  // 요청한 페이지가 전체 페이지 수보다 크면 마지막 페이지로 보정
  const currentPage = page > pageCount ? pageCount : page;
  const from = (currentPage - 1) * size;
  // 마지막 페이지의 경우 to 값은 totalCount - 1, 그 외는 from + size - 1
  const to = currentPage === pageCount ? totalCount - 1 : from + size - 1;

  // 3. 동일한 조건으로 range를 적용하여 실제 데이터를 조회
  let q = supabase
    .from("scripts")
    .select("*, tv:tvs(*), profile:profiles(email,username)", {
      count: "exact",
      signal, // abort signal 전달
    });

  if (filter) {
    if (Array.isArray(filter)) {
      filter.forEach((f) => {
        q = q[f.method || "eq"](f.field, f.value);
      });
    } else {
      q = q[filter.method || "eq"](filter.field, filter.value);
    }
  }

  if (query) {
    q = q.ilike("original_name", `%${query}%`);
  }

  if (sortBy) {
    q = q.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  q = q.range(from, to);

  const { data, error } = await q;

  if (error) {
    console.error(error);
    throw new Error("Scripts could not be loaded (data error)");
  }

  return { data, count };
}

/// For
export async function getScriptDataById(id) {
  const { data, error } = await supabase
    .from("scripts")
    .select("*, tv:tvs(*), profile:profiles(email,username)")
    .eq("id", id)
    .single();
  // console.log("data :>> ", data);
  if (error) {
    console.error(error);
    throw new Error("Scripts could not be loaded");
  }
  return data;
}

/// For Episodes
export async function getScriptsByShowId(showId) {
  const { data, count, error } = await supabase
    .from("scripts")
    .select(
      "*, show:tvs(name, first_air_date), profile:profiles(email,username)",
      {
        count: "exact",
      }
    )
    .eq("tvs.show_id", showId);

  // console.log("data:", data);
  if (error) {
    console.error(error);
    throw new Error("Scripts could not be loaded");
  }
  return { data, count };
}

export async function getNewScriptsWithinAWeek({ filter }) {
  // 오늘 날짜 기준 7일 전
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Supabase에서 "scripts" 테이블 조회 (카운트도 함께 조회)
  // const { data, error, count } = await supabase
  //   .from("scripts")
  //   .select(
  //     "*, show:tvs(name, first_air_date, poster_path), profile:profiles(email,username)",
  //     {
  //       count: "exact",
  //     }
  //   )
  //   .gte("created_at", oneWeekAgo.toISOString());

  // 3. 동일한 조건으로 range를 적용하여 실제 데이터를 조회
  let query = supabase
    .from("scripts")
    .select("*, show:tvs(*), profile:profiles(email,username)", {
      count: "exact",
    })
    .gte("created_at", oneWeekAgo.toISOString());

  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  query = query.range(0, 9);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch new scripts: ${error.message}`);
  }

  if (error) {
    console.error(error);
    throw new Error("Scripts could not be found");
  }
  return { data, count };
}

export async function confirmScript(id, obj) {
  const { data, error } = await supabase
    .from("scripts")
    .update(obj)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Script could not be updated");
  }
  return data;
}

export async function deleteScript(id) {
  const { data, error } = await supabase.from("scripts").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("scripts could not be deleted");
  }

  return data;
}

// We expect a newCabin object that looks like {setting: newValue}
export async function updateScript(newCabin) {
  const { data, error } = await supabase
    .from("scripts")
    .update(newCabin)
    // There is only ONE row of cabins, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("scripts could not be updated");
  }
  return data;
}

export async function createEditScript(newScript, id) {
  const hasImagePath = newScript.image?.startsWith?.(supabaseUrl);

  // UUID-filename
  const uniqueImageName = `${uuidv4().split("-")[0]}`;
  const imageName = `${uniqueImageName}-${newScript.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newScript.image
    : `${supabaseUrl}/storage/v1/object/public/script-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("scripts");

  // A) CREATE
  if (!id) query = query.insert([{ ...newScript, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newScript, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("scripts could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("script-images")
    .upload(imageName, newScript.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("scripts").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "script image could not be uploaded and the scripts was not created"
    );
  }

  return data;
}
