import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

import { useIntl } from "react-intl";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import UsersTableRow from "../authentication/UsersTableRow";
import { useUsers } from "../authentication/useUsers";
import UsersTableOperations from "./UsersTableOperations";
// import { useShowScripts } from "./useBookings";

function UsersTable() {
  // const { showScripts, isLoading, count } = useShowScripts();
  const pageSize = 5;
  const { users, count, isPending } = useUsers(pageSize);
  const intl = useIntl();
  const resourceName = intl.formatMessage({ id: "menu.users" });

  if (isPending) return <Spinner />;

  const userColumns = `15rem 6rem 6rem 8rem 6rem repeat(auto-fit, minmax(50px, 1fr))`;

  return (
    <>
      <UsersTableOperations />
      <Menus>
        <Table columns={userColumns}>
          <Table.Header>
            <div>email</div>
            <div>avatar</div>
            <div>name</div>
            <div>role</div>
            <div>play</div>
            <div>alive</div>
            <div>join date</div>
            <div>manage</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={users}
            render={(user) => <UsersTableRow key={user.id} user={user} />}
          />

          <Table.Footer>
            <Pagination count={count} size={5} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default UsersTable;
