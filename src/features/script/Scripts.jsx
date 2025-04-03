import ScriptSearch from "./ScriptSearch";
import ScriptTable from "./ScriptTable";

function Scripts() {
  return (
    <>
      {/* search by titles */}
      <ScriptSearch></ScriptSearch>

      {/* scripts  */}
      <ScriptTable></ScriptTable>
    </>
  );
}

export default Scripts;
