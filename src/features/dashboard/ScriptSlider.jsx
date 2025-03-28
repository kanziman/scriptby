import Slider from "react-slick";
import ArrowButton from "../../ui/ArrowButton";
import ScriptSliderItem from "./ScriptSliderItem";

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

function ScriptSlider({ items = [] }) {
  const slidesToShow = 5;
  const sliderSettings = {
    dots: true,
    speed: 500,
    slidesToScroll: 1,
    infinite: items.length >= slidesToShow,
    slidesToShow: slidesToShow,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
    responsive: [
      {
        breakpoint: 1024,
        // 데스크탑에서도 최소 3개를 유지
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 960,
        // 태블릿에서는 2개 이상
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 800,
        // 태블릿에서는 2개 이상
        settings: { slidesToShow: 3 },
      },
    ],
  };

  return (
    <Slider {...sliderSettings}>
      {items.map((item) => {
        return <ScriptSliderItem item={item} key={item.id} />;
      })}
    </Slider>
  );
}

export default ScriptSlider;
