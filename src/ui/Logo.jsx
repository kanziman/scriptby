import styled, { css } from "styled-components";
import { useSettings } from "../context/SettingsContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: auto;

  ${(props) =>
    props.size === "large" &&
    css`
      height: 12.6rem;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      height: 4.8rem;
    `}
`;

function Logo({ size }) {
  const { isDarkMode } = useSettings();

  const src = isDarkMode ? "/logodark.png" : "/logolight.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" size={size} />
    </StyledLogo>
  );
}

export default Logo;
