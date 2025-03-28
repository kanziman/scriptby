import React from "react";
import ArrowButton from "../../ui/ArrowButton";

// 화살표 버튼 컴포넌트 정의
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

// slider 설정 객체를 정의
const SlideSettings = {
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

export default SlideSettings;
