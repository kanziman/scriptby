import styled from "styled-components";
import { languages } from "../data/IOS-639-1";

const StyledFlagText = styled.span`
  display: flex;
  align-items: center;
`;

const FlagWrapper = styled.span`
  font-size: 1.8rem;
  z-index: 0;
`;

// 언어 데이터의 타입
interface Language {
  Code: string;
  Flag: string;
  EnglishName: string;
}

interface FlagsProps {
  code: string;
}

function Flags({ code }: FlagsProps): JSX.Element | null {
  const language = languages.find(
    (lang: Language) => lang.Code.toLowerCase() === code.toLowerCase()
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
