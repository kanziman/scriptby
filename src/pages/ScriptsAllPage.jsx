import ScriptTable from "../features/script/ScriptTable";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";

function ScriptsAllPage() {
  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">{`SCRIPTS`}</Heading>
      </MainHeading>

      <ScriptTable></ScriptTable>
    </>
  );
}

export default ScriptsAllPage;
