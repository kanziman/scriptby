import styled, { css } from "styled-components";
import { useSettings } from "../context/SettingsContext";

const StyledLogo = styled.div`
  text-align: center;
  /* border-bottom: 1px solid var(--color-brand-500); */
`;

const Img = styled.img`
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
`;

function Logo({ size }) {
  const { darkMode } = useSettings();
  const src = darkMode ? "/logodark.png" : "/logolight.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" size={size} />
    </StyledLogo>
  );
}

export default Logo;
