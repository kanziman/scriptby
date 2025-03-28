import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ActionContainer from "../../ui/ActionContainer";
import Spinner from "../../ui/Spinner";
import { TMDB_BASE_URL, TMDB_KEY } from "../../utils/constants";

const DetailWrapper = styled.div`
  position: relative;
  color: #ddd;
`;

const Backdrop = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
  height: 80vh;
  width: 100%;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
  display: flex;
  gap: 2rem;
  width: 90%;
  flex-wrap: nowrap;

  @media (max-width: 50em) {
    flex-direction: column;
    align-items: center;
    top: 5%;
    h1 {
      font-size: 2.8rem;
    }
    h3 {
      font-size: 1.4rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
`;

const Poster = styled.img`
  width: 33%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  aspect-ratio: 2/3;
  object-fit: cover;
`;

const Details = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 50em) {
    gap: 0.4rem;
  }
`;

const Title = styled.h1`
  /* font-size: 3rem; */
  margin: 0;
`;

const Tagline = styled.h3`
  /* font-size: 1.5rem; */
  font-style: italic;
  color: #ddd;
  margin: 0;
`;

const Info = styled.p`
  margin: 0.2rem 0;
  font-size: 1.2rem;
`;

const Overview = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
`;

const HomepageLink = styled.a`
  color: #ddd;
  text-decoration: underline;
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

  if (loading) return <div>Loading...</div>;
  if (!tv) return <div>No data available</div>;

  if (!isBackdropLoaded) return <Spinner />;
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
