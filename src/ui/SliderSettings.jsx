import { NextButton, PrevButton } from "./SliderArrows";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
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

export default settings;
