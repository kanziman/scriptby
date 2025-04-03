import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { useQuery } from "../../context/QueryContext";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import MainHeading from "../../ui/MainHeading";
import AddScriptForm from "./AddScriptForm";

function AddScript() {
  const { selectedShow } = useQuery();
  const { action } = useParams();
  const isEdit = action === "edit";

  if (!selectedShow?.id) {
    return <Empty resourceName={<FormattedMessage id="empty.show" />} />;
  }

  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">
          {<FormattedMessage id="scriptAdd.addHeader" />}
        </Heading>
      </MainHeading>
      {/* ADD */}
      <AddScriptForm isEdit={isEdit} />
    </>
  );
}

export default AddScript;
