import { useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Menus from "../../ui/Menus";
import SidebarTab from "../../ui/SidebarTab";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TableOperations from "../../ui/TableOperations";
import { sliceDataLeftRight } from "../../utils/helpers";
import ScreenRow from "./ScreenRow";
import { useScriptOne } from "./useScriptOne";

const StyledSideScreen = styled.aside`
  padding-top: 3rem;
  & span {
    font-size: 1.2rem;
  }
`;

function SideScreen() {
  const { scriptId } = useParams();
  const intl = useIntl();

  const localizedOptions = [
    {
      value: "words",
      label: intl.formatMessage({
        id: "filter.words",
        defaultMessage: "WORDS",
      }),
    },
    {
      value: "phrases",
      label: intl.formatMessage({
        id: "filter.phrases",
        defaultMessage: "PHRASES",
      }),
    },
    {
      value: "idioms",
      label: intl.formatMessage({
        id: "filter.idioms",
        defaultMessage: "IDIOMS",
      }),
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const { tabData, isPending } = useScriptOne({
    scriptId,
    activeTabValue: localizedOptions[activeTab]?.value,
  });
  const sliced = sliceDataLeftRight(tabData);

  if (isPending) return <Spinner />;
  return (
    <StyledSideScreen>
      <TableOperations>
        <SidebarTab
          activeTab={activeTab}
          onTab={setActiveTab}
          options={localizedOptions}
        />
      </TableOperations>
      <Menus>
        <Table columns={"1fr 1fr"} minWidth="250px">
          {/* <Table.Header color={"brand"}></Table.Header> */}
          <Table.Body
            data={sliced}
            render={(item, index) => (
              <ScreenRow key={index} data={item} isToggled={true} />
            )}
          />
          <Table.Footer></Table.Footer>
        </Table>
      </Menus>
    </StyledSideScreen>
  );
}

export default SideScreen;
