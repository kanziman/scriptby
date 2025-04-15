import styled from "styled-components";
import { languages } from "../data/IOS-639-1";

const StyledFlagText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 0.8rem; */
  /* margin-bottom: 0.4rem; */
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

function FlagTextSlide({ code, textOnly = false, flagOnly = false }) {
  if (!code) {
    console.error("No lang code");
    return;
  }
  // code가 전달되지 않았거나 일치하는 언어가 없으면 null 반환
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
