import { FormattedMessage } from "react-intl";
import Scripts from "../features/script/Scripts";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";

function ScriptsAllPage() {
  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">{<FormattedMessage id="menu.scripts" />}</Heading>
      </MainHeading>

      <Scripts></Scripts>
    </>
  );
}

export default ScriptsAllPage;
