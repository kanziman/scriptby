import { useQuery } from "@tanstack/react-query";
import { getCurrentProfile } from "../../services/apiAuth";

export function useUser() {
  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentProfile,
    // queryFn: getCurrentUser,
  });

  return { isPending, user, error, isAuthenticated: user?.role !== undefined };
}
