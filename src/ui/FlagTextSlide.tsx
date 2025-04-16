import styled from "styled-components";
import { languages } from "../data/IOS-639-1";

// -------- 타입 정의 --------
interface FlagTextSlideProps {
  code: string;
  textOnly?: boolean;
  flagOnly?: boolean;
}

// -------- styled components --------
const StyledFlagText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlagWrapper = styled.span`
  font-size: 1.6rem;
  margin-bottom: 0.2rem;
`;

const FlagName = styled.span`
  font-size: 1rem;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 0.8rem;
  }
`;

// -------- main component --------
function FlagTextSlide({
  code,
  textOnly = false,
  flagOnly = false,
}: FlagTextSlideProps): JSX.Element | null {
  if (!code) {
    console.error("No lang code");
    return null;
  }

  const language = languages.find(
    (lang) => lang.Code.toLowerCase() === code.toLowerCase()
  );

  if (!language) return null;

  return (
    <StyledFlagText>
      {!textOnly && (
        <FlagWrapper role="img" aria-label={language.EnglishName}>
          {language.Flag}
        </FlagWrapper>
      )}
      {!flagOnly && <FlagName>{language.EnglishName}</FlagName>}
    </StyledFlagText>
  );
}

export default FlagTextSlide;
