import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonText from "../../ui/ButtonText";
import FilterGroup from "../../ui/FilterGroup.tsx";
import Heading from "../../ui/Heading";
import HeadingGroup from "../../ui/HeadingGroup";
import Spinner from "../../ui/Spinner";
import ScriptSlider from "./ScriptSlider";
import { useNewScripts } from "./useNewScripts";

const StyledTrendBoard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem 3.2rem 1.6rem;

  @media (${(props) => props.theme.media.mobile}) {
    padding: 1.2rem 0 1.6rem;
    gap: 1.2rem;
  }
`;

const RightAlignedButtonText = styled(ButtonText)`
  margin-left: auto;
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1rem;
  }
`;

function NewScriptBoard({ title, baseType }) {
  const navigate = useNavigate();

  // 기본 filter 값 (예: "movie")
  const [filter, setFilter] = useState("movie");
  const [items, setItems] = useState([]);
  const intl = useIntl();
  const filterOptions = [
    {
      value: "all",
      label: intl.formatMessage({
        id: "option.all",
      }),
    },
    {
      value: "movie",
      label: intl.formatMessage({
        id: "option.movie",
      }),
    },
    {
      value: "tv",
      label: intl.formatMessage({ id: "option.tv" }),
    },
  ];

  // baseType이 "newScripts"인지 여부 확인
  const isNewScripts = baseType === "newScripts";

  // TODO: to react-query
  const { isPending, newScripts } = useNewScripts({ options: filterOptions });

  useEffect(() => {
    async function fetchTrends() {
      try {
        if (isNewScripts) {
          const filtered = newScripts;
          setItems(filtered || []);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchTrends();
  }, [filter, baseType, isNewScripts, newScripts]);

  if (isPending) return <Spinner />;

  return (
    <StyledTrendBoard>
      <HeadingGroup>
        <Heading as="h2">{title}</Heading>
        <FilterGroup
          size="small"
          filterField="new-script"
          options={filterOptions}
          onChange={(newFilter) => setFilter(newFilter)}
        />

        <RightAlignedButtonText
          onClick={() => {
            navigate("/scripts");
          }}
        >
          <FormattedMessage id="newScriptBoard.seeAll" /> &rarr;
        </RightAlignedButtonText>
      </HeadingGroup>

      {/* MAIN */}
      <ScriptSlider items={items} />
    </StyledTrendBoard>
  );
}

export default NewScriptBoard;
