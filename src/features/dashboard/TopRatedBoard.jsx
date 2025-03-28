import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FilterGroup from "../../ui/FilterGroup";
import Heading from "../../ui/Heading";
import HeadingGroup from "../../ui/HeadingGroup";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { TMDB_BASE_URL, TMDB_KEY } from "../../utils/constants";
import CustomSlider from "./CustomSlider";

const StyledTrendBoard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

function TopRatedBoard({ title, baseType }) {
  // 기본 필터는 "movie"로 설정 (필요하다면 "tv"로 변경 가능)
  const [filter, setFilter] = useState("movie");
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterOptions = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV" },
  ];

  useEffect(() => {
    async function fetchTrends() {
      try {
        setLoading(true);
        const response = await fetch(
          `${TMDB_BASE_URL}/${filter}/${baseType}?api_key=${TMDB_KEY}`
        );
        const data = await response.json();
        setTrends(data.results.slice(10));
      } catch (error) {
        console.error("Error fetching trends:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrends();
  }, [filter, baseType]);

  if (loading) return <Spinner />;

  return (
    <StyledTrendBoard>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h2">{title}</Heading>
        </HeadingGroup>
        <FilterGroup
          filterField="type"
          options={filterOptions}
          value={filter}
          onChange={(newFilter) => setFilter(newFilter)}
        />
      </Row>
      {/* 현재 필터값(mediaType)을 CustomSlider에 전달 */}
      <CustomSlider trends={trends} mediaType={filter} />
    </StyledTrendBoard>
  );
}

export default TopRatedBoard;
