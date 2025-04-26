import { HiArrowLeft } from "react-icons/hi2";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import ButtonIcon from "../../ui/ButtonIcon";
import CustomSection from "../../ui/CustomSection";
import { DEFAULT_IMAGE, IMG_PATH } from "../../utils/constants";

const StyledDetail = styled.header`
  display: flex;
  position: relative;

  @media (${(props) => props.theme.media.tablet}) {
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: 1.6rem;
      gap: 1rem;
    }
    & span {
      font-size: 1rem;
    }
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const AbsoluteButton = styled(ButtonIcon)`
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: var(--color-grey-200);
  z-index: 999;
  display: flex;
  align-items: center;
  opacity: 0.8; /* 기본 상태에서 약간 투명 */
  transition: opacity 0.3s ease;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    opacity: 1; /* hover 시 불투명하게 */
    svg {
      color: var(--color-grey-50);
    }
  }
  svg {
    color: var(--color-grey-900);
  }
`;

function ShowInfoMain() {
  const { cleanedShow, dispatch } = useQuery();
  const {
    name,
    poster,
    date,
    vote,
    originalLanguage,
    isTv,
    numberOfSeasons,
    homepage,
  } = cleanedShow;

  return (
    <StyledDetail>
      <AbsoluteButton onClick={() => dispatch({ type: "shows/back" })}>
        <HiArrowLeft />
      </AbsoluteButton>
      <ImageWrapper>
        <img
          src={poster ? `${IMG_PATH}${poster}` : DEFAULT_IMAGE}
          alt={`${name} poster`}
        />
      </ImageWrapper>

      <CustomSection
        name={name}
        originalLanguage={originalLanguage}
        date={date}
        vote={vote}
        isTv={isTv}
        numberOfSeasons={numberOfSeasons}
        homepage={homepage}
      ></CustomSection>
    </StyledDetail>
  );
}

export default ShowInfoMain;
