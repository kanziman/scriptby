import styled from "styled-components";
import { languages } from "../data/IOS-639-1";

// export const FlagText = styled.span`
//   font-size: 2rem; /* 이모지 크기를 조절 */
//   border-radius: var(--border-radius-tiny);
//   display: inline-block;
//   border: 1px solid var(--color-grey-100);
//   padding: 0.2rem;
// `;
const StyledFlagText = styled.span`
  display: flex;
  align-items: center;
`;
const FlagWrapper = styled.span`
  font-size: 1.8rem;
  z-index: 99;
`;

function Flags({ code }) {
  // code가 전달되지 않았거나 일치하는 언어가 없으면 null 반환
  const language = languages.find(
    (lang) => lang.Code.toLowerCase() === code.toLowerCase()
  );

  if (!language) return null;

  return (
    <StyledFlagText>
      <FlagWrapper role="img" aria-label={language.EnglishName}>
        {language.Flag}
      </FlagWrapper>
    </StyledFlagText>
  );
}

export default Flags;
