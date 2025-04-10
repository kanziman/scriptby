import { FormattedMessage } from "react-intl";
import ScriptDetail from "../features/scripts/ScriptDetail";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";

function ScriptPage() {
  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">{<FormattedMessage id="menu.script" />}</Heading>
      </MainHeading>

      <ScriptDetail />
    </>
  );
}

export default ScriptPage;
