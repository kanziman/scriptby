import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
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
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding: 2.4rem 3.2rem 1.6rem;

  @media (max-width: 34em) {
    padding: 1.2rem 0 1.6rem;
    gap: 1.2rem;
  }
`;

function TopRatedBoard({ title, baseType }) {
  // 기본 필터는 "movie"로 설정 (필요하다면 "tv"로 변경 가능)
  const [filter, setFilter] = useState("movie");
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);

  const intl = useIntl();
  const filterOptions = [
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
          size="small"
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
