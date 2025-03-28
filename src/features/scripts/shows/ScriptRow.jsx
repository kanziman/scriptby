// import {
//   HiArrowDownOnSquare,
//   HiArrowUpOnSquare,
//   HiEye,
//   HiPaintBrush,
//   HiTrash,
// } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// import ConfirmDelete from "../../../ui/ConfirmDelete";
// import Menus from "../../../ui/Menus";
// import Modal from "../../../ui/Modal";
// import Table from "../../../ui/Table";
// import Tag from "../../../ui/Tag";

// import { format, isToday } from "date-fns";
// import { useUser } from "../../../features/authentication/useUser";
// import { getFlag, getLanguageName } from "../../../utils/helpers";
// import { useConfirm } from "./useConfirm";
// import { useDeleteBooking } from "./useDeleteBooking";

// const Stacked = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.2rem;
//   cursor: pointer;

//   & span:first-child {
//     font-weight: 500;
//   }

//   & span:last-child {
//     color: var(--color-grey-500);
//     font-size: 1.2rem;
//   }
// `;

// const statusToTagName = {
//   unconfirmed: "blue",
//   confirmed: "green",
//   "checked-out": "silver",
// };

// function ScriptRow({
//   script: {
//     id: scriptId,
//     name,
//     status,
//     season_number: seasonNumber,
//     episode_number: episodeNumber,
//     air_date: airDate,
//     // vote_count: voteCount,
//     created_at: createdAt,
//     original_language: originalLanguage,
//     translated_language: translatedLanguage,
//     user_id: scriptUserId,
//     show: { name: showName, first_air_date: firstAirDate },
//     profile: { email, username },
//   },
// }) {
//   const navigate = useNavigate();
//   const { user: currentUser } = useUser();
//   const { confirm, isPending } = useConfirm();
//   const { deleteBooking, isDeleting } = useDeleteBooking();

//   const userRole = currentUser?.role;

//   const canConfirm = userRole === "manager" || userRole === "master";
//   const canDeleteUpdate =
//     userRole === "master" || scriptUserId === currentUser?.id;
//   return (
//     <>
//       <Table.Row onClick={() => navigate(`/scripts/${scriptId}`)}>
//         <Stacked>
//           <span>{`Season ${seasonNumber}`}</span>
//           <span>{`Episode ${episodeNumber}`}</span>
//         </Stacked>
//         <Stacked>
//           <span>{showName}</span>
//           <span>{`${firstAirDate}`}</span>
//         </Stacked>
//         <Stacked>
//           <span>{name}</span>
//           <span>{`${airDate}`}</span>
//         </Stacked>
//         <Stacked>
//           <span>{getFlag(originalLanguage)} &rarr; </span>
//           <span>{getLanguageName(originalLanguage)}</span>
//         </Stacked>
//         <Stacked>
//           <span>{getFlag(translatedLanguage)}</span>
//           <span>{getLanguageName(translatedLanguage)}</span>
//         </Stacked>
//         <Stacked>
//           {isToday(new Date(createdAt)) ? (
//             <span>{"Today"}</span>
//           ) : (
//             <span>{format(new Date(createdAt), "yyyy.MM.dd")}</span>
//           )}
//           <span>{format(new Date(createdAt), "HH:mm:ss")}</span>
//         </Stacked>

//         <Stacked>
//           <span>{username}</span>
//           <span>{email}</span>
//         </Stacked>

//         <Tag
//           type={statusToTagName[status]}
//           disabled={canConfirm}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {status.replace("-", " ")}
//         </Tag>

//         <Modal>
//           <Menus.Menu>
//             <Menus.Toggle id={scriptId} />
//             <Menus.List id={scriptId}>
//               <Menus.Button
//                 icon={<HiEye />}
//                 onClick={() => navigate(`/scripts/${scriptId}`)}
//               >
//                 See details
//               </Menus.Button>

//               {canConfirm && status === "unconfirmed" && (
//                 <Menus.Button
//                   icon={<HiArrowDownOnSquare />}
//                   onClick={() => confirm({ scriptId, status: "confirmed" })}
//                   disabled={isPending}
//                 >
//                   Confirm
//                 </Menus.Button>
//               )}
//               {canConfirm && status === "confirmed" && (
//                 <Menus.Button
//                   icon={<HiArrowUpOnSquare />}
//                   onClick={() => confirm({ scriptId, status: "unconfirmed" })}
//                   disabled={isPending}
//                 >
//                   Unconfirm
//                 </Menus.Button>
//               )}
//               {canDeleteUpdate && (
//                 <>
//                   <Modal.Open opens="delete">
//                     <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
//                   </Modal.Open>

//                   <Menus.Button
//                     icon={<HiPaintBrush />}
//                     onClick={() => confirm({ scriptId, status: "update" })}
//                   >
//                     Update
//                   </Menus.Button>
//                 </>
//               )}
//             </Menus.List>
//           </Menus.Menu>

//           <Modal.Window name="delete">
//             <ConfirmDelete
//               resourceName="script"
//               disabled={isDeleting}
//               onConfirm={() => deleteBooking(scriptId)}
//             />
//           </Modal.Window>
//         </Modal>
//       </Table.Row>
//     </>
//   );
// }

// export default ScriptRow;
