// import { format } from "date-fns";
// import { useMemo, useState } from "react";
// import toast from "react-hot-toast";
// import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
// import { FormattedMessage } from "react-intl";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { useQuery } from "../../../context/QueryContext";
// import { languages } from "../../../data/IOS-639-1";
// import Button from "../../../ui/Button";
// import ButtonGroup from "../../../ui/ButtonGroup";
// import DataItem from "../../../ui/DataItem";
// import FlagSelect from "../../../ui/FlagSelect";
// import Input from "../../../ui/Input";
// import Tag from "../../../ui/Tag";
// import { toEnglishName, transformSection } from "../../../utils/helpers";
// import { useUser } from "../../authentication/useUser";
// import SpreadSheetImport from "../../file/SpreadSheetImport";
// import { useCreateScript } from "../../file/useCreateScript";

// const StyledScriptAddForm = styled.section`
//   /* Box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);

//   overflow: hidden;
// `;

// const Header = styled.header`
//   background-color: var(--color-grey-100);
//   padding: 2rem 4rem;
//   color: var(--color-grey-500);
//   font-size: 1.8rem;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   svg {
//     height: 3.2rem;
//     width: 3.2rem;
//   }

//   & span {
//     /* font-family: "Sono"; */
//     color: var(--color-grey-700);
//     font-size: 2.6rem;
//     margin-left: 4px;
//   }
// `;
// const Section = styled.section`
//   padding: 3.2rem 4rem 1.2rem;
//   gap: 1rem;
//   display: flex;
//   flex-direction: column;

//   /* & span {
//     font-family: "Sono";
//   } */
// `;

// const Footer = styled.footer`
//   padding: 1.6rem 4rem;
//   font-size: 1.2rem;
//   color: var(--color-grey-500);
//   text-align: right;
// `;
// // const StyledFlagGroup = styled.div`
// //   display: flex;
// //   flex-wrap: wrap;
// //   gap: 1rem;
// //   justify-self: flex-end;
// //   align-items: center;
// //   padding: 0 0 0 2rem;
// // `;
// const StyledFlagGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   align-items: center;
//   justify-self: flex-end;
// `;
// const TagGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   padding: 2.4rem 0;
// `;

// function AddScriptForm() {
//   const navigate = useNavigate();

//   const { selectedShow, selectedEpisode, cleanedShow } = useQuery();
//   const { user: currentUser } = useUser();
//   const { createAll, isCreating } = useCreateScript();

//   const userId = currentUser?.id;

//   const { name, originalLanguage, originalName } = cleanedShow;
//   const isTv = selectedShow?.first_air_date && selectedShow?.name;

//   // const {
//   //   name: episodeName,
//   //   episode_number: episodeNumber,
//   //   season_number: seasonNumber,
//   // } = state.selectedEpisode;

//   const episodeName = selectedEpisode?.name;
//   const episodeNumber = selectedEpisode?.episode_number;
//   const seasonNumber = selectedEpisode?.season_number;

//   const [fileName, setFileName] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("");
//   const [script, setScript] = useState();

//   const isAddButtonActive = useMemo(() => {
//     return fileName && selectedLanguage;
//   }, [fileName, selectedLanguage]);

//   function handleOnSubmit(uploadData, fileName) {
//     const { id, scripts, ...rest } = selectedEpisode;

//     const baseScript = {
//       ...rest,
//       original_language: originalLanguage,
//       translated_language: selectedLanguage,
//       original_name: originalName,
//       episode_id: id,
//       user_id: userId,
//     };

//     const transformedData = {
//       lines: transformSection(uploadData, "original", "translated"),
//       words: transformSection(uploadData, "original_words", "translated_words"),
//       phrasal_verbs: transformSection(
//         uploadData,
//         "original_phrasal_verbs",
//         "translated_phrasal_verbs"
//       ),
//       idioms: transformSection(
//         uploadData,
//         "original_idioms",
//         "translated_idioms"
//       ),
//     };

//     const newScript = {
//       ...baseScript,
//       ...transformedData,
//     };
//     setScript(newScript);
//     setFileName(fileName);

//     // createAll(
//     //   {
//     //     ...script,
//     //     lines: linesToCreate,
//     //     words: wordsToCreate,
//     //     phrasal_verbs: phrasalVerbsToCreate,
//     //     idioms: idiomsToCreate,
//     //   },
//     //   {
//     //     onSuccess: (data) => {
//     //       setFileName(fileName);
//     //       // reset();
//     //     },
//     //   }
//     // );
//   }

//   function handleOnChange(e) {
//     setSelectedLanguage(e.target.value);
//   }

//   function handleOnClick() {
//     if (!script) return;
//     if (!userId) {
//       toast.error("Should be logined");
//       return;
//     }
//     createAll(
//       { script, show: { ...selectedShow } },
//       {
//         onSuccess: () => {
//           // reset();
//           navigate("/scripts");
//         },
//       }
//     );
//   }

//   return (
//     <>
//       <StyledScriptAddForm>
//         <Header>
//           <span>{name}</span>
//           <p>{format(new Date(), "yyyy-MM-dd(EEE)")} </p>
//         </Header>
//         <Section>
//           <TagGroup>
//             {isTv && (
//               <>
//                 <Tag type={"blue"}>
//                   # {<FormattedMessage id="scriptAdd.season" />} {seasonNumber}
//                 </Tag>
//                 <Tag type={"blue"}>
//                   # {<FormattedMessage id="scriptAdd.episode" />}{" "}
//                   {episodeNumber}
//                 </Tag>
//               </>
//             )}

//             <Tag type={"blue"}>
//               # {<FormattedMessage id="scriptAdd.creator" />}{" "}
//               {currentUser?.username}
//             </Tag>
//             {selectedLanguage && (
//               <Tag type={"blue"}>
//                 # {<FormattedMessage id="scriptAdd.language" />}{" "}
//                 {toEnglishName(selectedLanguage)}
//               </Tag>
//             )}
//             {fileName && <Tag type={"blue"}># {fileName}</Tag>}
//           </TagGroup>

//           {isTv && (
//             <>
//               <DataItem
//                 icon={<HiOutlineCheckCircle />}
//                 label={<FormattedMessage id="scriptAdd.season" />}
//               >
//                 <Input id="title" type="text" value={seasonNumber} disabled />
//               </DataItem>

//               <DataItem
//                 icon={<HiOutlineCheckCircle />}
//                 label={<FormattedMessage id="scriptAdd.episode" />}
//               >
//                 <Input id="title" type="text" value={episodeName} disabled />
//               </DataItem>
//             </>
//           )}

//           <DataItem
//             icon={<HiOutlineCheckCircle />}
//             label={<FormattedMessage id="scriptAdd.creator" />}
//           >
//             <Input id="title" type="text" value={currentUser?.email} disabled />
//           </DataItem>

//           <DataItem
//             label={<FormattedMessage id="scriptAdd.language" />}
//             icon={
//               selectedLanguage ? (
//                 <HiOutlineCheckCircle />
//               ) : (
//                 <HiOutlineXCircle color="red" />
//               )
//             }
//           >
//             <StyledFlagGroup>
//               <FlagSelect
//                 options={languages}
//                 value={originalLanguage}
//                 disabled
//               />
//               &rarr;
//               <FlagSelect
//                 options={languages}
//                 value={selectedLanguage}
//                 onChange={handleOnChange}
//               ></FlagSelect>
//             </StyledFlagGroup>
//           </DataItem>

//           <DataItem
//             label={<FormattedMessage id="scriptAdd.file" />}
//             icon={
//               fileName ? (
//                 <HiOutlineCheckCircle />
//               ) : (
//                 <HiOutlineXCircle color="red" />
//               )
//             }
//           >
//             <SpreadSheetImport
//               handleOnSubmit={handleOnSubmit}
//               isCreating={isCreating}
//               fileName={fileName}
//             />
//           </DataItem>
//         </Section>
//         <Footer>
//           <p>{format(new Date(), "EEE, MMM dd yyyy, p")}</p>
//         </Footer>
//       </StyledScriptAddForm>

//       <ButtonGroup>
//         <Button
//           disabled={!isAddButtonActive}
//           variation={isAddButtonActive ? "primary" : "inactive"}
//           onClick={handleOnClick}
//         >
//           <FormattedMessage id="button.submit" />
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default AddScriptForm;
