import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useSettings } from "../context/SettingsContext";
import ButtonIcon from "./ButtonIcon";

function DarkModeToggle() {
  // const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { darkMode, toggleDarkMode } = useSettings();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
