import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import ButtonText from "../../ui/ButtonText";
import FilterGroup from "../../ui/FilterGroup";
import Heading from "../../ui/Heading";
import HeadingGroup from "../../ui/HeadingGroup";
import Spinner from "../../ui/Spinner";
import { TMDB_BASE_URL, TMDB_KEY } from "../../utils/constants";
import ScriptSlider from "./ScriptSlider";
import { useNewScripts } from "./useNewScripts";

const StyledTrendBoard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding: 2.4rem 3.2rem 3.2rem;

  @media (max-width: 34em) {
    padding: 1.2rem 1.6rem 2.8rem;
  }
`;

// RightAlignedButtonText는 margin-left: auto를 적용하여 오른쪽 끝에 붙게 함
const RightAlignedButtonText = styled(ButtonText)`
  margin-left: auto;
`;

function NewScriptBoard({ title, baseType }) {
  const navigate = useNavigate();

  // 기본 filter 값 (예: "movie")
  const [filter, setFilter] = useState("movie");
  const [items, setItems] = useState([]);

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV" },
  ];

  // baseType이 "newScripts"인지 여부 확인
  const isNewScripts = baseType === "newScripts";

  // newScripts일 경우에는 커스텀 hook을 사용
  const { isPending, newScripts } = useNewScripts({ options: filterOptions });

  useEffect(() => {
    async function fetchTrends() {
      try {
        if (isNewScripts) {
          const filtered = newScripts;
          setItems(filtered || []);
        } else {
          // top_rated 등 다른 baseType일 경우 TMDB API 호출
          const response = await fetch(
            `${TMDB_BASE_URL}/${filter}/${baseType}?api_key=${TMDB_KEY}`
          );
          const data = await response.json();
          setItems(data.results);
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
          filterField="new-script"
          options={filterOptions}
          onChange={(newFilter) => setFilter(newFilter)}
        />
        <RightAlignedButtonText
          onClick={() => {
            navigate("/scripts");
          }}
        >
          <span>See all &rarr;</span>
        </RightAlignedButtonText>
      </HeadingGroup>
      <ScriptSlider items={items} />
    </StyledTrendBoard>
  );
}

export default NewScriptBoard;
