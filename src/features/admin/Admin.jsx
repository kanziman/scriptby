import Heading from "../../ui/Heading";
import SignupForm from "../authentication/SignupForm";
import ScriptTable from "../script/ScriptTable";
import UsersTable from "./UsersTable";
function Admin() {
  return (
    <>
      <Heading as="h1">Manage Users</Heading>
      <UsersTable />
      <ScriptTable />
      <SignupForm />
    </>
  );
}

export default Admin;
