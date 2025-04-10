import { FaLanguage } from "react-icons/fa";
import { FaLanguage as FaLang2 } from "react-icons/fa6";
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
import { messages } from "../context/LanguageProvider";
import { useSettings } from "../context/SettingsContext";
import Logout from "../features/authentication/Logout";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
import { useBrowser } from "../hooks/useBrowser";
import ButtonIcon from "../ui/ButtonIcon";
import DarkModeToggle from "../ui/DarkModeToggle";
import Menus from "./Menus";
import SpinnerMini from "./SpinnerMini";

const StyledHeaderMenu = styled.ul`
  display: ${({ isBrowserSmall }) => (!isBrowserSmall ? "flex" : "none")};
  gap: 0.4rem;
`;

const StyledMenus = styled.div`
  display: ${({ isBrowserSmall }) => (isBrowserSmall ? "flex" : "none")};
`;

function HeaderMenu() {
  const isBrowserSmall = useBrowser();
  // const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { darkMode, toggleDarkMode, locale, changeLanguage } = useSettings();
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();
  const { user: currentUser } = useUser();
  // const { locale, changeLanguage } = useLanguage();
  const handleClick = () => {
    if (currentUser) {
      navigate("/account");
      return;
    }
    navigate("/login");
  };

  const languageSequence = ["ko", "en", "ja"];
  const currentIndex = languageSequence.indexOf(locale);
  const LanguageIcon = currentIndex % 2 === 0 ? FaLanguage : FaLang2;
  const nextIndex = messages[languageSequence[currentIndex + 1]]
    ? (currentIndex + 1) % languageSequence.length
    : (currentIndex + 2) % languageSequence.length;
  const nextLanguage = languageSequence[nextIndex];

  const handleToggle = () => {
    changeLanguage(nextLanguage);
  };

  return (
    <>
      <StyledHeaderMenu isBrowserSmall={isBrowserSmall}>
        <li>
          <ButtonIcon onClick={handleClick}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <DarkModeToggle />
        </li>
        <li>
          <ButtonIcon onClick={handleToggle}>
            <LanguageIcon />
          </ButtonIcon>
        </li>
        <li>{currentUser && <Logout />}</li>
      </StyledHeaderMenu>

      <StyledMenus isBrowserSmall={isBrowserSmall}>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={2} icon={<HiOutlineMenu />} />
            <Menus.List id={2}>
              <Menus.Button onClick={handleClick} icon={<HiOutlineUser />}>
                <FormattedMessage id="menu.account" />
              </Menus.Button>
              <Menus.Button onClick={handleToggle} icon={<LanguageIcon />}>
                <FormattedMessage id="menu.language" />
              </Menus.Button>
              <Menus.Button
                icon={darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
                onClick={toggleDarkMode}
              >
                <FormattedMessage id="menu.darkMode" />
              </Menus.Button>

              {currentUser ? (
                <Menus.Button
                  icon={
                    !isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />
                  }
                  onClick={logout}
                >
                  <FormattedMessage id="menu.logout" />
                </Menus.Button>
              ) : (
                <Menus.Button
                  icon={
                    !isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />
                  }
                  onClick={handleClick}
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
