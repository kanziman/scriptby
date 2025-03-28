// import { useParams } from "react-router-dom";
// import styled from "styled-components";
// import ScriptTable from "../../features/scripts/shows/ScriptTable";
// import { useMoveBack } from "../../hooks/useMoveBack";
// import ButtonText from "../../ui/ButtonText";
// import Empty from "../../ui/Empty";
// import Heading from "../../ui/Heading";
// import Row from "../../ui/Row";
// const HeadingGroup = styled.div`
//   display: flex;
//   gap: 2.4rem;
//   align-items: center;
// `;

// function ScriptsPage() {
//   const moveBack = useMoveBack();
//   const { showId } = useParams();

//   // if (isLoading) return <Spinner />;
//   if (!showId) return <Empty resourceName="no show" />;

//   return (
//     <>
//       <Row type="horizontal">
//         <HeadingGroup>
//           <Heading as="h1">Show #{showId}</Heading>
//         </HeadingGroup>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>
//       <ScriptTable></ScriptTable>
//     </>
//   );
// }

// export default ScriptsPage;
