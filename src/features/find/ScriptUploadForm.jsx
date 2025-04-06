// import { useForm } from "react-hook-form";

// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Form from "../../ui/Form";
// import FormRow from "../../ui/FormRow";
// import Input from "../../ui/Input";

// import { useCreateScript } from "./useCreateScript";

// function ScriptUploadForm({ episode = {}, onCloseModal }) {
//   console.log("episode:", episode);

//   const episodeData = {
//     episodeId: episode.id,
//     seasonNumber: episode.season_number,
//     episodeNumber: episode.episode_number,
//     airDate: episode.air_date,
//     image: episode.still_path,
//     voteAverage: episode.vote_average,
//     name: episode.name,
//   };

//   const { isCreating, createScript } = useCreateScript();
//   const isWorking = isCreating;

//   const { register, handleSubmit, reset, getValues, formState } = useForm({
//     defaultValues: episodeData,
//   });

//   const { errors } = formState;

//   function onSubmit(data) {
//     console.log("submit data:", data);
//     return true;
//     // const image = typeof data.image === "string" ? data.image : data.image[0];

//     // createScript(
//     //   { ...data, image: image },
//     //   {
//     //     onSuccess: (data) => {
//     //       reset();
//     //       onCloseModal?.();
//     //     },
//     //   }
//     // );
//   }

//   function onError(errors) {
//     // console.log(errors);
//   }

//   return (
//     <Form
//       onSubmit={handleSubmit(onSubmit, onError)}
//       type={onCloseModal ? "modal" : "regular"}
//     >
//       {/* Episode ID */}
//       <Input
//         type="text"
//         id="episodeId"
//         hidden
//         disabled
//         {...register("episodeId", {
//           required: "This field is required",
//         })}
//       />
//       {/* Episode Name */}
//       <FormRow label="Episode Name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled
//           {...register("name", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       {/* Season Number */}
//       <FormRow label="Season Number" error={errors?.seasonNumber?.message}>
//         <Input
//           type="number"
//           id="seasonNumber"
//           disabled
//           {...register("seasonNumber", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Season number should be at least 1",
//             },
//           })}
//         />
//       </FormRow>

//       {/* Episode Number */}
//       <FormRow label="Episode Number" error={errors?.episodeNumber?.message}>
//         <Input
//           type="number"
//           id="episodeNumber"
//           disabled
//           {...register("episodeNumber", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Episode number should be at least 1",
//             },
//           })}
//         />
//       </FormRow>

//       {/* Air Date */}
//       <FormRow label="Air Date" error={errors?.airDate?.message}>
//         <Input
//           type="date"
//           id="airDate"
//           disabled
//           {...register("airDate", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       {/* Vote Average */}
//       <FormRow label="Vote Average" error={errors?.voteAverage?.message}>
//         <Input
//           type="number"
//           id="voteAverage"
//           disabled
//           {...register("voteAverage", {
//             required: "This field is required",
//             min: {
//               value: 0,
//               message: "Vote average cannot be negative",
//             },
//             max: {
//               value: 10,
//               message: "Vote average cannot be more than 10",
//             },
//           })}
//         />
//       </FormRow>

//       {/* Image Upload */}
//       <FormRow label="Upload File" error={errors?.image?.message}>
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: false,
//             // "This field is required",
//           })}
//         />
//       </FormRow>
//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button
//           variation="secondary"
//           type="reset"
//           onClick={() => onCloseModal?.()}
//         >
//           Cancel
//         </Button>
//         <Button disabled={isWorking}>{"Create new cabin"}</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default ScriptUploadForm;
