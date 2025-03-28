import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import ArrowButton from "../../ui/ArrowButton";

// 화살표 버튼 컴포넌트들
const PrevButton = (props) => {
  const { onClick } = props;
  return (
    <ArrowButton style={{ left: "10px" }} onClick={onClick}>
      {"<"}
    </ArrowButton>
  );
};

const NextButton = (props) => {
  const { onClick } = props;
  return (
    <ArrowButton style={{ right: "10px" }} onClick={onClick}>
      {">"}
    </ArrowButton>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <NextButton />,
  prevArrow: <PrevButton />,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 5 },
    },
    {
      breakpoint: 960,
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 800,
      settings: { slidesToShow: 3 },
    },
  ],
};

const StyledItem = styled.div`
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  /* 최소 높이를 지정해 카드 간 높이 차이가 없도록 */
  min-height: 30rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  /* 고정된 비율 유지 (예: 2:3) */
  aspect-ratio: 2 / 3;
  overflow: hidden;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

const Title = styled.h3`
  font-size: 1.6rem;
  color: var(--color-grey-800);
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /* height: 3.2rem;  */
`;

function CustomSlider({ trends, mediaType }) {
  const navigate = useNavigate();

  const handleClick = (trendId) => {
    // mediaType 값을 포함하여 상세 페이지로 이동합니다.
    navigate(`/trend/${mediaType}/${trendId}`);
  };

  return (
    <Slider {...settings}>
      {trends.map((trend) => (
        <StyledItem key={trend.id} onClick={() => handleClick(trend.id)}>
          <ImageWrapper>
            <img
              src={`https://image.tmdb.org/t/p/w500${trend.poster_path}`}
              alt={trend.title || trend.name}
            />
          </ImageWrapper>
          <Title>{trend.title || trend.name}</Title>
        </StyledItem>
      ))}
    </Slider>
  );
}

export default CustomSlider;
