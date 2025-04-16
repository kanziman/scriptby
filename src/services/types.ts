export interface Profile {
  id: string;
  email?: string;
  username?: string;
  avatar_url?: string;
  role: "user" | "manager" | "master";
  play?: "student" | "tutor" | "requested";
  created_at?: string;
  [key: string]: any;
}
export interface ExtendedProfile extends Profile {
  isMaster: boolean;
  isManager: boolean;
  isUser: boolean;
  isTutor: boolean;
  isStudent: boolean;
}
export interface SortBy {
  field: keyof Profile;
  direction: "asc" | "desc";
}

type SupabaseFilterMethod =
  | "eq"
  | "neq"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "like"
  | "ilike";
export interface Filter {
  field: keyof Profile;
  value: any;
  method?: SupabaseFilterMethod;
}
