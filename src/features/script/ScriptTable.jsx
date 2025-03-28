import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

import { useLocation } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import ScriptRow from "./ScriptRow";
import ScriptTableOperations from "./ScriptTableOperations";
import { useScript } from "./useScript";
function ScriptTable() {
  const { scripts, isLoading, count } = useScript();
  const location = useLocation();
  const isAdminPage = location.pathname.includes("users") ? true : false;
  const adminColumns = "0.6fr 1fr 1fr 0.4fr 0.4fr 0.4fr 0.8fr 1fr 2rem";
  const userColumns = "repeat(auto-fit, minmax(50px, 1fr))";

  if (isLoading) return <Spinner />;
  if (!scripts?.length) return <Empty resourceName="no scripts" />;

  return (
    <>
      <ScriptTableOperations />

      <Menus>
        <Table columns={isAdminPage ? adminColumns : userColumns}>
          <Table.Header>
            <div>Type</div>
            <div>Title</div>
            <div>Info</div>
            <div>original</div>
            <div>to</div>
            <div>date</div>
            <div>creator</div>
            {isAdminPage ? <div>status</div> : null}
            <div></div>
          </Table.Header>

          <Table.Body
            data={scripts}
            render={(script) => (
              <ScriptRow
                columns={isAdminPage ? adminColumns : userColumns}
                isAdminPage={isAdminPage}
                key={script.id}
                script={script}
              />
            )}
          />

          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>

        {/* <ButtonGroup>
        <Button onClick={() => navigate(`/scripts/add`)}>ADD</Button>
      </ButtonGroup> */}
      </Menus>
    </>
  );
}

export default ScriptTable;
