import { useParams } from "react-router-dom";
import AddScript from "../features/script/AddScript";
import EditScript from "../features/script/EditScript";

/// FIND PAGE => BUTTON CLICK => SCRIPT ADD PAGE
function AddScriptPage() {
  const { action } = useParams();
  const isEdit = action === "edit";

  return !isEdit ? <AddScript /> : <EditScript />;
}

export default AddScriptPage;
