import { applyFilter } from "./applyFilter";
import supabase, { supabaseUrl } from "./supabase";
import { ExtendedProfile, Filter, Profile, SortBy } from "./types";

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signup({ username, email, password }: SignupCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: username,
        avatar_url: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  const profile = await getCurrentProfile();
  return profile;
}

interface UserMetadata {
  role: "master" | "manager" | "user";
}

interface SupabaseUserWithRoles
  extends Omit<
    Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"],
    "user_metadata"
  > {
  user_metadata: UserMetadata;
  isMaster: boolean;
  isManager: boolean;
  isUser: boolean;
}

/// USING AUTH
export async function getCurrentUser(): Promise<SupabaseUserWithRoles | null> {
  console.log("getCurrentUser!");
  const { data: session } = await supabase.auth.getSession();
  console.log("session!", session);

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (!data.user) return null;

  const role = (data.user.user_metadata as UserMetadata)?.role;

  const extendedUser: SupabaseUserWithRoles = {
    ...data.user,
    isMaster: role === "master",
    isManager: role === "manager",
    isUser: role === "user",
    user_metadata: {
      role,
    },
  };

  if (error) throw new Error(error.message);
  return extendedUser;
}

/// USING PROFILE
export async function getCurrentProfile(): Promise<ExtendedProfile | null> {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.session.user.id)
    .single<Profile>();

  if (error) throw new Error(error.message);
  if (!data) return null;

  const extendedProfile: ExtendedProfile = {
    ...data,
    isMaster: data.role === "master",
    isManager: data.role === "manager",
    isUser: data.role === "user",
    isTutor: data.play === "tutor",
    isStudent: data.play === "student",
  };

  return extendedProfile;
}

export async function getAllUsers(): Promise<{
  data: Profile[];
  count: number | null;
}> {
  const { data, count, error } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at");

  if (error) throw new Error(error.message);

  return {
    data: data as Profile[],
    count,
  };
}

// 🔹 페이지 요청 파라미터
interface GetUsersWithPageParams {
  filter?: Filter;
  sortBy?: SortBy;
  page: number;
  size: number;
}

// 🔹 반환 타입
interface GetUsersWithPageResponse {
  data: Profile[];
  count: number;
}

export async function getUsersWithPage({
  filter,
  sortBy,
  page,
  size,
}: GetUsersWithPageParams): Promise<GetUsersWithPageResponse> {
  // 1. 전체 행수(count)를 조회하기 위한 베이스 쿼리 생성
  let baseQuery = supabase.from("profiles").select("*", { count: "exact" });

  if (filter) {
    baseQuery = applyFilter(baseQuery, filter);
  }

  if (sortBy) {
    baseQuery = baseQuery.order(sortBy.field as string, {
      ascending: sortBy.direction === "asc",
    });
  }

  // 2. count만 먼저 가져옴
  const { count, error: countError } = await baseQuery;
  if (countError || count === null) {
    console.error(countError);
    throw new Error("Users could not be loaded (count error)");
  }

  const totalCount = count;
  const pageCount = Math.ceil(totalCount / size);
  // 요청한 페이지가 전체 페이지 수보다 크면 마지막 페이지로 보정
  const currentPage = page > pageCount ? pageCount : page;
  const from = (currentPage - 1) * size;
  // 마지막 페이지의 경우 to 값은 totalCount - 1, 그 외는 from + size - 1
  const to = currentPage === pageCount ? totalCount - 1 : from + size - 1;

  // 3. 동일한 조건으로 range를 적용하여 실제 데이터를 조회
  let query = supabase.from("profiles").select("*", { count: "exact" });

  if (filter) {
    query = applyFilter(baseQuery, filter);
    filter.field, filter.value;
  }

  if (sortBy) {
    query = query.order(sortBy.field as string, {
      ascending: sortBy.direction === "asc",
    });
  }

  query = query.range(from, to);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded (data error)");
  }

  return { data, count };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// TYPE
export interface UserUpdateInput {
  userId?: string;
  password?: string;
  username?: string;
  avatar?: File;
  role?: string;
  play?: string;
}
interface ProfileData {
  username?: string;
  role?: string;
  play?: string;
  password?: string;
}
// UPDATE USER
export async function updateCurrentProfile(input: UserUpdateInput) {
  const { password, username, avatar, role, play } = input;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("사용자를 찾을 수 없습니다");

  // 1. 비밀번호 업데이트 (auth 테이블에 해당)
  if (password) {
    const { error: passwordError } = await supabase.auth.updateUser({
      password,
    });
    if (passwordError) throw new Error(passwordError.message);
  }

  // 프로필 업데이트 데이터 준비
  let profileData: ProfileData = {};
  if (username) profileData.username = username;
  if (role) profileData.role = role;
  if (play) profileData.play = play;

  // 프로필 데이터가 있으면 profiles 테이블 업데이트
  if (Object.keys(profileData).length > 0) {
    const { error: profileError } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", user.id);

    if (profileError) throw new Error(profileError.message);
  }

  // 2. 아바타 이미지 업로드
  if (avatar) {
    const fileName = `${user.id}/${Math.random()}`;
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // 3. 아바타 URL을 profiles 테이블에 업데이트
    const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

    const { error: avatarError } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    if (avatarError) throw new Error(avatarError.message);
  }

  // 업데이트된 사용자 데이터 반환
  const { data: updatedProfile, error: fetchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  return { user, profile: updatedProfile };
}

/// UPDATE USERS BY ADMIN(MANAGER,MASTER)

export async function updateUserByAdmin(input: UserUpdateInput) {
  const { userId, password, username, role, avatar, play } = input;
  if (!userId) {
    console.error("userId is required to update another user.");
    return;
  }

  // 업데이트할 데이터 구성
  let profileData: ProfileData = {};

  if (password) profileData.password = password;
  if (username) profileData.username = username;
  if (role) profileData.role = role;
  if (play) profileData.play = play;

  // console.log("Updating user by admin:", userId, "with data:", profileData);

  // Supabase DB 업데이트 (마스터 계정은 Service Role 사용)
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", userId);
  // console.log("data :>> ", data);
  if (error) {
    console.error("Error updating user:", error);
  } else if (!data) {
    console.error(
      "No rows updated. This may be due to RLS policy restrictions."
    );
  } else {
    console.log("User updated successfully:", data);
  }

  // 2. 아바타 이미지 업로드
  if (avatar) {
    const fileName = `${userId}/${Math.random()}`;
    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // 3. 아바타 URL을 profiles 테이블에 업데이트
    const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

    const { error: avatarError } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", userId);

    if (avatarError) throw new Error(avatarError.message);
  }

  return { data, error };
}
