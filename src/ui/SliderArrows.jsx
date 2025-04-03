// SliderArrows.jsx
import ArrowButton from "./ArrowButton";

export const PrevButton = ({ onClick }) => (
  <ArrowButton
    style={{ left: "10px", top: "12rem", position: "absolute" }}
    onClick={onClick}
  >
    {"<"}
  </ArrowButton>
);

export const NextButton = ({ onClick }) => (
  <ArrowButton
    style={{ right: "8px", top: "12rem", position: "absolute" }}
    onClick={onClick}
  >
    {">"}
  </ArrowButton>
);
