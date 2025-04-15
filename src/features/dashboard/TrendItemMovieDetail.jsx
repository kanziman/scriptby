import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ActionContainer from "../../ui/ActionContainer";
import Spinner from "../../ui/Spinner";
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

  @media (${(props) => props.theme.media.tablet}) {
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

  @media (${(props) => props.theme.media.tablet}) {
    max-width: 250px;
  }
`;

const Details = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (${(props) => props.theme.media.tablet}) {
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

  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1rem;
  }
`;

// 줄거리(Overview)
const Overview = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;

  @media (${(props) => props.theme.media.tablet}) {
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

// 콘텐츠 영역을 감싸는 스크롤 가능한 컨테이너
// const ScrollableContainer = styled.div`
//   position: relative;
//   z-index: 1;
//   width: 100%;
//   overflow-y: auto;
//   flex: 1;
// `;

function MovieDetail({ play }) {
  const { trendId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        setLoading(true);
        // 영화 상세 정보 조회 (TV쇼라면 엔드포인트를 /tv/ 로 변경)
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/${trendId}?api_key=${TMDB_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie detail");
        }
        const detail = await response.json();
        setMovie(detail);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetail();
  }, [trendId]);

  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  useEffect(() => {
    if (movie?.backdrop_path) {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;
      img.onload = () => setIsBackdropLoaded(true);
      img.onerror = () => setIsBackdropLoaded(true);
    } else {
      setIsBackdropLoaded(true);
    }
  }, [movie?.backdrop_path]);

  if (loading && !isBackdropLoaded) return <Spinner />;
  if (!movie) return <div>No data available</div>;

  return (
    <DetailWrapper>
      <Backdrop
        image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      />
      <>
        <ContentWrapper>
          <Poster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <Details>
            <Title>{movie.title}</Title>
            {movie.tagline && <Tagline>{movie.tagline}</Tagline>}
            <Info>
              <strong>Release Date:</strong> {movie.release_date}
            </Info>
            <Info>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </Info>
            <Info>
              <strong>Rating:</strong> {movie.vote_average} / 10 (
              {movie.vote_count} votes)
            </Info>
            <Info>
              <strong>Budget:</strong> ${movie.budget.toLocaleString()}
            </Info>
            <Info>
              <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
            </Info>
            {movie.genres && movie.genres.length > 0 && (
              <Info>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </Info>
            )}
            {movie.homepage && (
              <Info>
                <strong>Homepage:</strong>{" "}
                <HomepageLink
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {movie.homepage}
                </HomepageLink>
              </Info>
            )}
            <Overview>{movie.overview}</Overview>
            <ActionContainer play={play} baseType="movie" showId={movie.id} />
          </Details>
        </ContentWrapper>
      </>
    </DetailWrapper>
  );
}

export default MovieDetail;
