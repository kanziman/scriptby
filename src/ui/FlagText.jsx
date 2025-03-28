import styled from "styled-components";
import { languages } from "../data/IOS-639-1";

const StyledFlagText = styled.div`
  display: flex;
  flex-direction: ${({ type }) => (type === "horizontal" ? "row" : "column")};
  align-items: center;
  gap: 0.8rem;

  /* margin-bottom: 0.4rem; */
`;

const FlagWrapper = styled.span`
  font-size: 1.2rem;

  /* vertical이면 아래쪽 마진, horizontal이면 오른쪽 마진 */
  margin-bottom: ${({ type }) => (type === "horizontal" ? "0" : "0.2rem")};
`;

const FlagName = styled.span`
  font-size: 1.2rem;
  @media (max-width: 90em) {
    font-size: 1.1rem;
  }
  @media (max-width: 42em) {
    font-size: 0.8rem;
  }
`;

function FlagText({ code, type = "vertical" }) {
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
    <StyledFlagText type={type}>
      <FlagWrapper type={type} role="img" aria-label={language.EnglishName}>
        {language.Flag}
      </FlagWrapper>
      <FlagName>{language.EnglishName}</FlagName>
    </StyledFlagText>
  );
}

export default FlagText;
