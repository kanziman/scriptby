import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";
import styled, { css } from "styled-components";

// -------- Styled Components --------
interface CommonRowProps {
  columns?: string;
  minWidth?: string;
  type?: string;
}

const StyledTable = styled.div`
  border: 1px solid var(--color-secondary-50);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow-x: auto;
  width: 100%;
`;

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 1.2rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  min-width: ${(props) => props.minWidth || "700px"};
  word-break: keep-all;

  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1.2rem;
    padding: 1.2rem;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  min-width: ${(props) => props.minWidth || "700px"};

  &:hover {
    background-color: var(--color-grey-50);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-50);
  }

  ${(props) =>
    props.type === "posts" &&
    css`
      background-color: var(--color-grey-100);
      &:hover {
        background-color: var(--color-grey-200);
      }
    `}

  @media (${(props) => props.theme.media.tablet}) {
    padding: 1.2rem;
  }
`;

const StyledBody = styled.section``;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// -------- Context --------
interface TableContextType {
  columns: string;
  windowWidth: number;
  minWidth?: string;
}

const TableContext = createContext<TableContextType | null>(null);

// -------- Table --------
interface TableProps {
  children: ReactNode;
  columns: string;
  minWidth?: string;
}

function Table({ columns, children, minWidth }: TableProps): JSX.Element {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dynamicColumns =
    windowWidth <= 800 ? "repeat(auto-fit, minmax(50px, 1fr))" : columns;

  return (
    <TableContext.Provider
      value={{ columns: columns ?? dynamicColumns, windowWidth, minWidth }}
    >
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

// -------- Header --------
interface HeaderProps {
  children: ReactNode;
  fixedColumns?: string;
  color?: string;
}

function Header({
  fixedColumns,
  color,
  children,
}: HeaderProps): JSX.Element | null {
  const context = useContext(TableContext);
  if (!context) return null;

  const { columns, minWidth } = context;

  return (
    <StyledHeader
      role="row"
      columns={fixedColumns || columns}
      as="header"
      color={color}
      minWidth={minWidth}
    >
      {children}
    </StyledHeader>
  );
}

// -------- Row --------
interface RowProps {
  children: ReactNode;
  type?: string;
}

function Row({ children, ...props }: RowProps): JSX.Element | null {
  const context = useContext(TableContext);
  if (!context) return null;

  const { columns, minWidth } = context;

  return (
    <StyledRow role="row" columns={columns} minWidth={minWidth} {...props}>
      {children}
    </StyledRow>
  );
}

// -------- Body --------
interface BodyProps<T> {
  data: T[];
  render: (item: T) => ReactElement;
}

function Body<T>({ data, render }: BodyProps<T>): JSX.Element {
  if (!data || data.length === 0) {
    return (
      <Empty>
        <FormattedMessage
          id="empty.noData"
          defaultMessage="No data to show at the moment"
        />
      </Empty>
    );
  }

  return <StyledBody>{data.map(render)}</StyledBody>;
}

// -------- Export 구성 --------
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
