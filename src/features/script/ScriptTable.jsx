import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

import { useLocation } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import ScriptRow from "./ScriptRow";
// import ScriptTableOperations from "./ScriptTableOperations";
import { FormattedMessage, useIntl } from "react-intl";

import { useUser } from "../authentication/useUser";
import { useScript } from "./useScript";
function ScriptTable() {
  const { scripts, isLoading, count } = useScript();
  const location = useLocation();
  const isAdminPage = location.pathname.includes("users") ? true : false;
  const { user: currentUser } = useUser();

  // const adminColumns = "0.6fr 1fr 1fr 0.4fr 0.4fr 0.4fr 0.8fr 1fr 2rem";
  // const userColumns = "repeat(auto-fit, minmax(50px, 1fr))";
  const userColumns = `6rem 6rem repeat(auto-fit, minmax(50px, 1fr))`;

  const intl = useIntl();
  const resourceName = intl.formatMessage({ id: "menu.scripts" });
  if (isLoading) return <Spinner />;
  if (!scripts?.length) {
    return <Empty resource={resourceName} />;
  }

  return (
    <>
      <Menus>
        <Table columns={userColumns}>
          <Table.Header>
            <div>
              <FormattedMessage id="table.header.status" />
            </div>
            <div>
              <FormattedMessage id="table.header.type" />
            </div>
            <div>
              <FormattedMessage id="table.header.title" />
            </div>
            <div>
              <FormattedMessage id="table.header.info" />
            </div>
            <div>
              <FormattedMessage id="table.header.original" />
            </div>
            <div>
              <FormattedMessage id="table.header.to" />
            </div>
            <div>
              <FormattedMessage id="table.header.date" />
            </div>
            <div>
              <FormattedMessage id="table.header.contributor" />
            </div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={scripts}
            render={(script) => (
              <ScriptRow
                columns={userColumns}
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
      </Menus>
    </>
  );
}

export default ScriptTable;
