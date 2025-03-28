import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import UsersTableOperations from "./UsersTableOperations";
import UsersTableRow from "../authentication/UsersTableRow";
import { useUsers } from "../authentication/useUsers";
// import { useShowScripts } from "./useBookings";

function UsersTable() {
  // const { showScripts, isLoading, count } = useShowScripts();
  const pageSize = 5;
  const { users, count, isPending } = useUsers(pageSize);
  if (isPending) return <Spinner />;

  if (!users?.length) return <Empty resourceName="users" />;

  return (
    <>
      <UsersTableOperations />
      <Menus>
        <Table columns="1.4fr .5fr .5fr .5fr .5fr  .5fr 1fr .5fr .2rem">
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
