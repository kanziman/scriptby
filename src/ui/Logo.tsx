import styled, { css } from "styled-components";
import { useSettings } from "../context/SettingsContext";

type LogoSize = "small" | "medium" | "large";

interface ImgProps {
  size?: LogoSize;
}

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img<ImgProps>`
  width: auto;

  ${(props) =>
    props.size === "large" &&
    css`
      height: 8rem;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      height: 4.8rem;
    `}
  ${(props) =>
    props.size === "small" &&
    css`
      height: 3.2rem;
    `}
`;

interface LogoProps {
  size?: LogoSize;
}

function Logo({ size = "medium" }: LogoProps): JSX.Element {
  const { darkMode } = useSettings();
  const src = darkMode ? "/logodark.png" : "/logolight.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" size={size} />
    </StyledLogo>
  );
}

export default Logo;
