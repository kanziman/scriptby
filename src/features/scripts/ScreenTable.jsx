import Empty from "../../ui/Empty";
import Table from "../../ui/Table";

import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import ScreenPagenation from "./ScreenPagenation";
import ScreenRow from "./ScreenRow";
import { useScriptOne } from "./useScriptOne";

function ScreenTable({ isToggled, children, hideTranslation }) {
  const { scriptId } = useParams();
  const { script, count, subData, isPending } = useScriptOne({
    scriptId,
    isToggled,
  });

  if (isPending) return <Spinner />;
  if (!script) {
    return <Empty resourceName={<FormattedMessage id="empty.script" />} />;
  }

  return (
    <>
      <Table columns={isToggled ? "1fr 1fr" : "1fr"} minWidth="400">
        <Table.Header fixedColumns={"1fr 1fr"}>{children}</Table.Header>
        <Table.Body
          data={script}
          render={(item, index) => (
            <ScreenRow
              key={index}
              data={item}
              subData={subData}
              isToggled={isToggled}
              hideTranslation={hideTranslation}
            />
          )}
        />

        <Table.Footer>
          <ScreenPagenation count={count} isToggled={isToggled} />
        </Table.Footer>
      </Table>
    </>
  );
}

export default ScreenTable;
