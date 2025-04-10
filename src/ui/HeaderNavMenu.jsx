import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Logo from "./Logo";

const StyledHeaderPageMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-family: "Sono";
  /* 
  li:nth-child(2) {
    display: none;
  } */
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
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-800);
    border-radius: var(--border-radius-sm);
  }

  @media (max-width: 34em) {
    &:link,
    &:visited {
      padding: 0.6rem;
    }
  }
`;

function HeaderNavMenu() {
  const { user } = useUser();
  return (
    <StyledHeaderPageMenu>
      <li>
        <StyledNavLink to="/">
          <Logo size="medium" />
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/dashboard">
          <span>
            <FormattedMessage id="menu.home" />
          </span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/find">
          <span>
            <FormattedMessage id="menu.find" />
          </span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/scripts">
          <span>
            <FormattedMessage id="menu.scripts" />
          </span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/posts">
          <span>
            <FormattedMessage id="menu.posts" />
          </span>
        </StyledNavLink>
      </li>
      {user?.isMaster && (
        <li>
          <StyledNavLink to="/users">
            <span>
              <FormattedMessage id="menu.users" />
            </span>
          </StyledNavLink>
        </li>
      )}
      {user?.isMaster && (
        <li>
          <StyledNavLink to="/convert">
            <span>
              <FormattedMessage id="menu.convert" />
            </span>
          </StyledNavLink>
        </li>
      )}
    </StyledHeaderPageMenu>
  );
}

export default HeaderNavMenu;
