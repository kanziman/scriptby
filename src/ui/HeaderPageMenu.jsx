import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Logo from "./Logo";

const StyledHeaderPageMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-family: "Sono";

  li:nth-child(2) {
    display: none;
  }
  @media (max-width: 50em) {
    gap: 0;

    li:first-child {
      display: none;
    }
    li:nth-child(2) {
      display: block;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  span {
    text-transform: uppercase;
  }
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    padding: ${(props) => (props.noPadding ? "0 1.2rem" : "0.6rem 1.2rem")};
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-800);
    border-radius: var(--border-radius-sm);
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function HeaderPageMenu() {
  const { user } = useUser();
  console.log("user :>> ", user);
  return (
    <StyledHeaderPageMenu>
      <li>
        <StyledNavLink to="/" $noPadding>
          <Logo size="medium" />
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/dashboard">
          <span>home</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/find">
          <span>find</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/scripts">
          <span>scripts</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/posts">
          <span>posts</span>
        </StyledNavLink>
      </li>
      {user?.isMaster && (
        <li>
          <StyledNavLink to="/users">
            <span>users</span>
          </StyledNavLink>
        </li>
      )}
    </StyledHeaderPageMenu>
  );
}

export default HeaderPageMenu;
