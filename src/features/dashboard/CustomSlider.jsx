import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSettings } from "../../context/SettingsContext";
import { MetaContainer, MetaSubGroup } from "../../ui/MetaSubGroup";

const StyledSwiperContainer = styled.div`
  width: 100%;
  position: relative;

  .swiper-wrapper {
    padding-bottom: 2rem;
  }
`;

const StyledItem = styled.div`
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 0.8rem;

  &:hover {
    transform: translateY(-8px);
    /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); */
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 7/10;
  margin-bottom: 1rem;
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  background-color: rgba(0, 0, 0, 0.7);

  color: var(--color-red-700);
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 2;
`;

const Star = styled.span`
  color: ${(props) => (props.filled ? "#FFD700" : "#E0E0E0")};
  font-size: 1.2rem;
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1cqmax;
  }
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
`;

const GenreTag = styled.span`
  background-color: var(--color-grey-200);
  color: var(--color-grey-700);
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  font-size: 0.8rem;
`;

function formatDate(dateString, locale) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    // month: "short",
    // day: "numeric",
  });
}

function renderStars(rating) {
  if (!rating) return null;

  const normalizedRating = rating / 2; // Assuming rating is out of 10
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= normalizedRating) {
      stars.push(
        <Star key={i} filled>
          ★
        </Star>
      );
    } else if (i - 0.5 <= normalizedRating) {
      stars.push(
        <Star key={i} filled>
          ★
        </Star>
      );
    } else {
      stars.push(<Star key={i}>☆</Star>);
    }
  }

  return stars;
}

function getGenreName(id, genreMap) {
  return genreMap[id] || "";
}

function CustomSlider({ trends, mediaType, genres = {} }) {
  const intl = useIntl();

  const navigate = useNavigate();
  const { locale } = useSettings();
  const handleClick = (trendId) => {
    navigate(`/trend/${mediaType}/${trendId}`);
  };

  return (
    <StyledSwiperContainer>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={15}
        slidesPerView={3} // 기본: 작은 화면에서 2개 표시
        breakpoints={{
          544: { slidesPerView: 3 },
          800: { slidesPerView: 3 },
          960: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="script-slider"
      >
        {trends.map((trend) => (
          <SwiperSlide key={trend.id}>
            <StyledItem onClick={() => handleClick(trend.id)}>
              <ImageWrapper>
                <img
                  src={`https://image.tmdb.org/t/p/w500${trend.poster_path}`}
                  alt={trend.title || trend.name}
                />
                {trend.vote_average > 7.5 && (
                  <Badge>
                    {intl.formatMessage({
                      id: "badge.hot",
                    })}
                  </Badge>
                )}
              </ImageWrapper>

              <MetaContainer title={trend.title || trend.name}>
                <MetaSubGroup
                  label={renderStars(trend.vote_average)}
                  value={
                    trend.vote_average ? trend.vote_average.toFixed(1) : "N/A"
                  }
                />
                <MetaSubGroup
                  label={intl.formatMessage({
                    id: "meta.released",
                  })}
                  value={formatDate(
                    trend.release_date || trend.first_air_date,
                    locale
                  )}
                />
              </MetaContainer>
            </StyledItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSwiperContainer>
  );
}

export default CustomSlider;
