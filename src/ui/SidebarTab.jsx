import styled from "styled-components";
import TabButton from "./Basic/TabButton";

const StyledFilter = styled.div`
  /* border: 1px solid var(--color-grey-100); */
  background-color: var(--color-grey-0);
  /* box-shadow: var(--shadow-sm); */
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.8rem;

  background-color: inherit;
`;

function SidebarTab({ activeTab, onTab, options }) {
  const currentFilter = options.at(activeTab).value;

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
