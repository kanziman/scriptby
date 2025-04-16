import { HiOutlineMenu } from "react-icons/hi";
import {
  HiArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUser,
} from "react-icons/hi2";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSettings } from "../context/SettingsContext";
import Logout from "../features/authentication/Logout";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
import { useBrowser } from "../hooks/useBrowser";
import { Locale, supportedLocales } from "../locales/supportedLocales";
import ButtonIcon from "../ui/ButtonIcon";
import DarkModeToggle from "../ui/DarkModeToggle";
import Menus from "./Menus";
import SpinnerMini from "./SpinnerMini";

// 🔹 Styled component props
interface ResponsiveProps {
  isBrowserSmall: boolean;
}

const StyledHeaderMenu = styled.ul<ResponsiveProps>`
  display: ${({ isBrowserSmall }) => (!isBrowserSmall ? "flex" : "none")};
  gap: 0.4rem;
`;

const StyledMenus = styled.div<ResponsiveProps>`
  display: ${({ isBrowserSmall }) => (isBrowserSmall ? "flex" : "none")};
`;

function HeaderMenu() {
  const isBrowserSmall = useBrowser();
  const { darkMode, toggleDarkMode, locale, changeLanguage } = useSettings();
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();
  const { user: currentUser } = useUser();

  const languageSequence: Locale[] = Object.keys(supportedLocales) as Locale[];

  const currentIndex = languageSequence.indexOf(locale);
  const nextLocale =
    languageSequence[(currentIndex + 1) % languageSequence.length];
  const currentLocale =
    languageSequence[currentIndex % languageSequence.length];

  const currentFlag = supportedLocales[currentLocale].flag;

  const handleLanguageToggle = () => {
    changeLanguage(nextLocale);
  };

  const handleAccountClick = () => {
    navigate(currentUser ? "/account" : "/login");
  };

  return (
    <>
      <StyledHeaderMenu isBrowserSmall={isBrowserSmall}>
        <li key="account">
          <ButtonIcon onClick={handleAccountClick}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li key="darkmode">
          <DarkModeToggle />
        </li>
        <li key="language">
          <ButtonIcon onClick={handleLanguageToggle}>
            <span role="img" aria-label={supportedLocales[nextLocale].label}>
              {currentFlag}
            </span>
          </ButtonIcon>
        </li>
        <li key="logout">{currentUser && <Logout />}</li>
      </StyledHeaderMenu>

      <StyledMenus isBrowserSmall={isBrowserSmall}>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={"header-menu"} icon={<HiOutlineMenu />} />
            <Menus.List id={"header-menu"}>
              <Menus.Button
                onClick={handleAccountClick}
                icon={<HiOutlineUser />}
              >
                <FormattedMessage id="menu.account" />
              </Menus.Button>
              <Menus.Button
                onClick={handleLanguageToggle}
                icon={
                  <span
                    role="img"
                    aria-label={supportedLocales[nextLocale].label}
                  >
                    {currentFlag}
                  </span>
                }
              >
                <FormattedMessage id="menu.language" />
              </Menus.Button>
              <Menus.Button
                onClick={toggleDarkMode}
                icon={darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
              >
                <FormattedMessage id="menu.darkMode" />
              </Menus.Button>

              {currentUser ? (
                <Menus.Button
                  icon={
                    !isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />
                  }
                  onClick={() => logout()}
                >
                  <FormattedMessage id="menu.logout" />
                </Menus.Button>
              ) : (
                <Menus.Button
                  icon={
                    !isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />
                  }
                  onClick={handleAccountClick}
                >
                  <FormattedMessage id="menu.login" />
                </Menus.Button>
              )}
            </Menus.List>
          </Menus.Menu>
        </Menus>
      </StyledMenus>
    </>
  );
}

export default HeaderMenu;
