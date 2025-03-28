// import { FormattedMessage } from "react-intl";
// import { useParams } from "react-router-dom";
// import { useQuery } from "../../context/QueryContext";
// import Empty from "../../ui/Empty";
// import MainHeading from "../../ui/MainHeading";
// import ScriptAddForm from "./shows/AddScriptForm";

// function AddScript() {
//   const {
//     state: { selectedShow },
//   } = useQuery();
//   const { id: showId } = selectedShow;

//   const { action } = useParams();
//   console.log("action2 :>> ", action);

//   if (!showId) return <Empty resourceName="no show" />;
//   return (
//     <>
//       <MainHeading
//         headName={<FormattedMessage id="script.addHeader" />}
//         right="moveBack"
//       />

//       <ScriptAddForm></ScriptAddForm>
//     </>
//   );
// }

// export default AddScript;
