import { ReactNode } from "react";
import styled from "styled-components";

// ---------------- Styled Components ----------------
const StyledMetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1.2rem 2rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  background-color: var(--color-grey-100);

  @media (${(props) => props.theme.media.bigTablet}) {
    padding: 0.8rem;
  }
`;

const StyledMetaGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;

  &:not(:last-child) {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const StyledMetaSubGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  color: var(--color-grey-500);

  @media (${(props) => props.theme.media.tablet}) {
    font-size: 0.9rem;
  }

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 0.8rem;
  }
`;

const StyledGroupTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (${(props) => props.theme.media.landScapeTablet}) {
    font-size: 1.2rem;
    -webkit-line-clamp: 2;
  }
  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1.2rem;
  }

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1rem;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: var(--color-grey-500);
  text-transform: capitalize;
  word-break: keep-all;
`;

const Value = styled.span`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Delimiter = styled.span`
  color: var(--color-grey-400);
  margin: 0 0.25rem;
`;

// ---------------- Component Props ----------------
interface MetaContainerProps {
  children: ReactNode;
  title?: string;
}

interface MetaGroupProps {
  children: ReactNode;
  title?: string;
}

interface MetaSubGroupProps {
  label: string;
  value: ReactNode;
  delimiter?: string;
  label1?: string;
  value1?: ReactNode;
}

// ---------------- Components ----------------
function MetaContainer({ children, title }: MetaContainerProps): JSX.Element {
  return (
    <StyledMetaContainer>
      {title && <StyledGroupTitle>{title}</StyledGroupTitle>}
      {children}
    </StyledMetaContainer>
  );
}

function MetaGroup({ children, title }: MetaGroupProps): JSX.Element {
  return (
    <>
      {title && <StyledGroupTitle>{title}</StyledGroupTitle>}
      <StyledMetaGroup>{children}</StyledMetaGroup>
    </>
  );
}

function MetaSubGroup({
  label,
  value,
  delimiter,
  label1,
  value1,
}: MetaSubGroupProps): JSX.Element {
  return (
    <StyledMetaSubGroup>
      <Label>{label}</Label>
      <Value>{value}</Value>
      {delimiter && (
        <>
          <Delimiter>{delimiter}</Delimiter>
          {label1 && <Label>{label1}</Label>}
          {value1 && <Value>{value1}</Value>}
        </>
      )}
    </StyledMetaSubGroup>
  );
}

export { MetaContainer, MetaGroup, MetaSubGroup };
