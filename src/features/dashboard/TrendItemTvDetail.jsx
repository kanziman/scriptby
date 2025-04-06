import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ActionContainer from "../../ui/ActionContainer";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import { TMDB_BASE_URL, TMDB_KEY } from "../../utils/constants";

// 전체 페이지를 감싸는 래퍼 (배경 이미지를 위한 relative container)
const DetailWrapper = styled.div`
  position: relative;
  color: #fff;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
`;

// 배경(backdrop) 이미지 스타일
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: top;
  filter: brightness(0.5);
  height: 100%;
  width: 100%;
`;

const ContentWrapper = styled.div`
  position: relative; // 절대 위치에서 상대 위치로 변경
  padding: 5% 5%;
  display: flex;
  gap: 2rem;
  width: 90%;
  flex-wrap: nowrap;
  /* z-index: 1; */
  margin: 0 auto;

  @media (max-width: 50em) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-bottom: 2rem;
    h1 {
      font-size: 2.8rem;
    }
    h3 {
      font-size: 1.4rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const Poster = styled.img`
  width: 50%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  aspect-ratio: 2/3;
  object-fit: cover;

  @media (max-width: 50em) {
    max-width: 250px;
  }
`;

const Details = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 50em) {
    gap: 0.4rem;
    width: 100%;
  }
`;

// 영화 제목
const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  word-break: break-word; // 긴 제목이 넘치지 않도록 처리
`;

// 태그라인 (있을 경우)
const Tagline = styled.h3`
  font-size: 1.5rem;
  font-style: italic;
  color: #ddd;
  margin: 0;
`;

// 기타 정보 (개봉일, 상영시간, 평점 등)
const Info = styled.p`
  margin: 0.2rem 0;
  font-size: 1.2rem;

  @media (max-width: 50em) {
    font-size: 1rem;
  }
`;

// 줄거리(Overview)
const Overview = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;

  @media (max-width: 50em) {
    font-size: 1rem;
  }
`;

// 링크 스타일
const HomepageLink = styled.a`
  color: #fff;
  text-decoration: underline;
  word-break: break-all; // 긴 URL이 넘치지 않도록 처리
  &:hover {
    color: #ccc;
  }
`;

function TVDetail({ play }) {
  const { trendId } = useParams();
  const [tv, setTv] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTVDetail() {
      try {
        setLoading(true);
        const response = await fetch(
          `${TMDB_BASE_URL}/tv/${trendId}?api_key=${TMDB_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch TV detail");
        }
        const detail = await response.json();
        setTv(detail);
      } catch (error) {
        console.error("Error fetching TV detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTVDetail();
  }, [trendId]);

  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  useEffect(() => {
    if (tv?.backdrop_path) {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/original${tv?.backdrop_path}`;
      img.onload = () => setIsBackdropLoaded(true);
      img.onerror = () => setIsBackdropLoaded(true);
    } else {
      setIsBackdropLoaded(true);
    }
  }, [tv?.backdrop_path]);

  if (loading || !isBackdropLoaded) return <Spinner />;
  if (!tv) return <div>No data available</div>;

  return (
    <DetailWrapper>
      <Backdrop
        image={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
      />
      <ContentWrapper>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
          alt={tv.name}
        />
        <Details>
          <Title>{tv.name}</Title>
          {tv.tagline && <Tagline>{tv.tagline}</Tagline>}
          <Info>
            <strong>First Air Date:</strong> {tv.first_air_date}
          </Info>
          <Info>
            <strong>Episode Runtime:</strong>{" "}
            {tv.episode_run_time && tv.episode_run_time.length > 0
              ? tv.episode_run_time[0] + " minutes"
              : "N/A"}
          </Info>
          <Info>
            <strong>Rating:</strong> {tv.vote_average} / 10 ({tv.vote_count}{" "}
            votes)
          </Info>
          <Info>
            <strong>Seasons:</strong> {tv.number_of_seasons}
          </Info>
          <Info>
            <strong>Episodes:</strong> {tv.number_of_episodes}
          </Info>
          {tv.genres && tv.genres.length > 0 && (
            <Info>
              <strong>Genres:</strong>{" "}
              {tv.genres.map((genre) => genre.name).join(", ")}
            </Info>
          )}
          {tv.homepage && (
            <Info>
              <strong>Homepage:</strong>{" "}
              <HomepageLink
                href={tv.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tv.homepage}
              </HomepageLink>
            </Info>
          )}
          <Overview>{tv.overview}</Overview>
          <ActionContainer
            play={play}
            baseType="tv"
            showId={tv.id}
            name={tv.name}
          />
        </Details>
      </ContentWrapper>
    </DetailWrapper>
  );
}

export default TVDetail;
