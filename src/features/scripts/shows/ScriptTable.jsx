// import Empty from "../../../ui/Empty";
// import Menus from "../../../ui/Menus";
// import Table from "../../../ui/Table";

// import { useNavigate } from "react-router-dom";
// import Button from "../../../ui/Button";
// import ButtonGroup from "../../../ui/ButtonGroup";
// import Pagination from "../../../ui/Pagination";
// import Spinner from "../../../ui/Spinner";
// import { useShowScripts } from "../useShowScripts";
// import ScriptRow from "./ScriptRow";

// function ScriptTable() {
//   console.log("table");
//   const { scripts, isLoading, count } = useShowScripts();
//   const navigate = useNavigate();

//   if (isLoading) return <Spinner />;

//   if (!scripts?.length) return <Empty resourceName="no scripts" />;

//   // const handleClick = (scriptId) => {
//   //   navigate(`/scripts/${scriptId}`);
//   // };

//   return (
//     <Menus>
//       <Table columns="0.6fr 1fr 1fr 0.6fr 0.6fr 0.6fr 1fr 1fr 2rem">
//         <Table.Header>
//           <div>Number</div>
//           <div>Title</div>
//           <div>Name</div>
//           <div>original</div>
//           <div>to</div>
//           <div>date</div>
//           <div>contributor</div>
//           <div>status</div>
//           <div></div>
//         </Table.Header>

//         <Table.Body
//           data={scripts}
//           render={(script) => <ScriptRow key={script.id} script={script} />}
//         />

//         <Table.Footer>
//           <Pagination count={count} />
//         </Table.Footer>
//       </Table>
//       <ButtonGroup>
//         <Button onClick={() => navigate(`/scripts/add`)}>ADD</Button>
//       </ButtonGroup>
//     </Menus>
//   );
// }

// export default ScriptTable;
