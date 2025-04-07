import { createContext, useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled, { css } from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-secondary-50);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow-x: auto;
  width: 100%;
`;

const CommonRow = styled.div`
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
  /* text-align: center; */
  @media (max-width: 50em) {
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
  @media (max-width: 50em) {
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

const TableContext = createContext();

function Table({ columns, children, minWidth }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 브라우저 너비에 따라 동적으로 컬럼 조정
  const dynamicColumns =
    windowWidth <= 800 ? "repeat(auto-fit, minmax(50px, 1fr))" : columns;

  return (
    <TableContext.Provider
      value={{
        columns: columns ? columns : dynamicColumns,
        windowWidth,
        minWidth, // minWidth를 context에 전달
      }}
    >
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ fixedColumns, color, children }) {
  const { columns, minWidth } = useContext(TableContext);
  return (
    <StyledHeader
      role="row"
      columns={fixedColumns || columns}
      as="header"
      color={color}
      minWidth={minWidth} // 여기서 minWidth 사용
    >
      {children}
    </StyledHeader>
  );
}

function Row({ children, ...props }) {
  const { columns, minWidth } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns} minWidth={minWidth} {...props}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data?.length) return;
  <Empty>
    <FormattedMessage
      id="empty.noData"
      defaultMessage="No data to show at the moment"
    />
  </Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
