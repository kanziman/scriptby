import styled from "styled-components";
import TabButton from "./TabButton";

// 🔹 Styled component
const StyledFilter = styled.div`
  background-color: inherit;
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`;

// 🔹 탭 옵션 타입
interface TabOption {
  value: string;
  label: string;
}

// 🔹 SidebarTab Props 타입
interface SidebarTabProps {
  activeTab: number;
  onTab: (index: number) => void;
  options: TabOption[];
}

function SidebarTab({ activeTab, onTab, options }: SidebarTabProps) {
  const currentFilter = options.at(activeTab)?.value;

  return (
    <StyledFilter>
      {options.map((option, index) => (
        <TabButton
          key={option.value}
          onClick={() => onTab(index)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </TabButton>
      ))}
    </StyledFilter>
  );
}

export default SidebarTab;
