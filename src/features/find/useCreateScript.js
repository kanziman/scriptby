// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { useIntl } from "react-intl";
// import { createEditScript } from "../../services/apiScripts";

// export function useCreateScript() {
//   const queryClient = useQueryClient();
//   const intl = useIntl();
//   const message = intl.formatMessage({
//     id: "toast.scriptCreated",
//     defaultMessage: "Script successfully created.",
//   });
//   const { mutate: createScript, isPending: isCreating } = useMutation({
//     mutationFn: createEditScript,
//     onSuccess: () => {
//       toast.success(message);
//       queryClient.invalidateQueries({ queryKey: ["scripts"] });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { isCreating, createScript };
// }
