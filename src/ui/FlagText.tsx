import styled from "styled-components";
import { languages } from "../data/IOS-639-1";

interface FlagTextProps {
  code: string;
  type?: "horizontal" | "vertical";
  gap?: string;
}

interface StyledFlagProps {
  type?: "horizontal" | "vertical";
  gap?: string;
}

const StyledFlagText = styled.div<StyledFlagProps>`
  display: flex;
  flex-direction: ${({ type }) => (type === "horizontal" ? "row" : "column")};
  align-items: center;
  gap: ${({ gap }) => (gap ? gap : "0.2rem")};
`;

const FlagWrapper = styled.span<StyledFlagProps>`
  font-size: 1.2rem;
  margin-bottom: ${({ type }) => (type === "horizontal" ? "0" : "0.2rem")};
`;

const FlagName = styled.span`
  font-size: 1.2rem;

  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1rem;
  }
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 0.8rem;
  }
`;

function FlagText({
  code,
  type = "vertical",
  gap,
}: FlagTextProps): JSX.Element | null {
  if (!code) {
    console.error("No lang code");
    return null;
  }

  const language = languages.find(
    (lang) => lang.Code.toLowerCase() === code.toLowerCase()
  );

  if (!language) return null;

  return (
    <StyledFlagText type={type} gap={gap}>
      <FlagWrapper type={type} role="img" aria-label={language.EnglishName}>
        {language.Flag}
      </FlagWrapper>
      <FlagName>{language.EnglishName}</FlagName>
    </StyledFlagText>
  );
}

export default FlagText;
