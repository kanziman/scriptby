import { FormattedMessage } from "react-intl";
import Find from "../features/find/Find";
import Heading from "../ui/Heading";
import MainHeading from "../ui/MainHeading";
function FindPage() {
  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">{<FormattedMessage id="menu.find" />}</Heading>
      </MainHeading>

      {/* FIND */}
      <Find></Find>
    </>
  );
}

export default FindPage;
