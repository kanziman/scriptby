import styled from "styled-components";
import Table from "../../ui/Table";
import { escapeRegExp } from "../../utils/helpers";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  & span:first-child {
    font-weight: 500;
    /* 글자 크기가 textScale에 따라 변경됨 (기본 1.2rem의 배율 적용) */
    font-size: ${(props) => `calc(1.2rem * ${props.fontSize})`};
  }
  & span:last-child {
    color: var(--color-grey-500);
    /* 기본 1rem 기준 */
    font-size: ${(props) => `calc(1.0rem * ${props.fontSize})`};
    font-family: "Noto Sans KR", "Noto Sans JP", sans-serif;
  }
  @media (max-width: 50em) {
    & span:first-child {
      font-size: ${(props) => `calc(1.2rem * ${props.fontSize})`};
    }
    & span:last-child {
      font-size: ${(props) => `calc(1.0rem * ${props.fontSize})`};
    }
    gap: 0.1rem;
  }
`;

const Colored = styled.em`
  font-style: italic;
  color: var(--color-brand-500);
`;

function renderColoredText(text, subData = []) {
  if (!text || !subData) return text;
  const pattern = subData.map((item) => escapeRegExp(item.original)).join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isHighlighted = subData.some(
      (item) => part.toLowerCase() === item.original?.toLowerCase()
    );
    return isHighlighted ? <Colored key={index}>{part}</Colored> : part;
  });
}

function TextContent({
  original,
  translated,
  hideTranslation,
  subData,
  fontSize,
}) {
  return (
    <Stacked fontSize={fontSize}>
      <span>{renderColoredText(original, subData)}</span>
      <span>{!hideTranslation && renderColoredText(translated, subData)}</span>
    </Stacked>
  );
}

function ScreenRow({ data, isToggled, hideTranslation, subData, fontSize }) {
  const { original, translated, left, right } = data;

  if (!isToggled) {
    return (
      <Table.Row>
        <TextContent
          original={original}
          translated={translated}
          hideTranslation={hideTranslation}
          subData={subData}
          fontSize={fontSize}
        />
      </Table.Row>
    );
  }

  return (
    <Table.Row>
      <TextContent
        original={left?.original}
        translated={left?.translated}
        hideTranslation={hideTranslation}
        subData={subData}
        fontSize={fontSize}
      />
      <TextContent
        original={right?.original}
        translated={right?.translated}
        hideTranslation={hideTranslation}
        subData={subData}
        fontSize={fontSize}
      />
    </Table.Row>
  );
}

export default ScreenRow;
