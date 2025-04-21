import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import { escapeRegExp } from "../../utils/helpers";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & .roman {
    color: var(--color-grey-400);
    font-size: ${(props) => `calc(1.0rem * ${props.fontSize})`};
    font-style: italic;
  }

  & .original {
    font-weight: 500;
    font-size: ${(props) => `calc(1.2rem * ${props.fontSize})`};
  }

  & .translated {
    color: var(--color-grey-500);
    font-size: ${(props) => `calc(1.0rem * ${props.fontSize})`};
    font-family: "Noto Sans KR", "Noto Sans JP", sans-serif;
  }

  @media (${(props) => props.theme.media.tablet}) {
    & .roman {
      font-size: ${(props) => `calc(1.0rem * ${props.fontSize})`};
    }

    & .original {
      font-size: ${(props) => `calc(1.2rem * ${props.fontSize})`};
    }

    & .translated {
      font-size: ${(props) => `calc(1.0rem * ${props.fontSize})`};
    }

    gap: 0.1rem;
  }
`;

const Colored = styled.em`
  font-style: italic;
  color: var(--color-brand-500);
`;
function renderColoredText(text, subData = [], filterValue = "lines") {
  if (!text || !subData || subData.length === 0) return text;

  if (filterValue === "phrases") {
    let matchIndices = [];

    // 문장에서 매칭되는 구문 위치를 찾기 위한 루프
    subData.forEach((item, i) => {
      const cleaned = item.original.replace("★", "").trim();
      const [verb, particle] = cleaned.split(" ");
      if (!verb || !particle) return;

      // 예: pick(ed|s|ing)? (it)? up
      const expr = new RegExp(
        `\\b${verb}(ed|s|ing)?(\\s+\\w+)?\\s+${particle}\\b`,
        "gi"
      );

      let match;
      while ((match = expr.exec(text)) !== null) {
        matchIndices.push({
          start: match.index,
          end: match.index + match[0].length,
        });
      }
    });

    // 겹치는 매치 제거 + 정렬
    matchIndices = matchIndices
      .sort((a, b) => a.start - b.start)
      .filter((item, index, arr) => {
        if (index === 0) return true;
        return item.start >= arr[index - 1].end;
      });

    // 텍스트를 쪼개면서 강조 처리
    const result = [];
    let lastIndex = 0;
    matchIndices.forEach(({ start, end }, i) => {
      if (lastIndex < start) {
        result.push(text.slice(lastIndex, start));
      }
      result.push(<Colored key={i}>{text.slice(start, end)}</Colored>);
      lastIndex = end;
    });
    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }

    return result;
  }

  // === 기본 처리 (단순 일치 강조) ===
  const pattern = subData
    .map((item) => escapeRegExp(item.original.replace("★", "").trim()))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isHighlighted = subData.some(
      (item) =>
        part.toLowerCase() ===
        item.original.replace("★", "").trim().toLowerCase()
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
  roman,
  filterValue,
}) {
  return (
    <Stacked fontSize={fontSize}>
      {roman && <span className="roman">{roman}</span>}
      <span className="original">
        {renderColoredText(original, subData, filterValue)}
      </span>
      <span className="translated">
        {!hideTranslation &&
          renderColoredText(translated, subData, filterValue)}
      </span>
    </Stacked>
  );
}

function ScreenRow({
  data,
  isToggled,
  hideTranslation,
  subData,
  fontSize,
  isRomanToggled,
}) {
  const { original, translated, left, right, roman } = data;

  const romanProp = isRomanToggled ? roman : undefined;

  const [searchParams, _] = useSearchParams();
  const filterValue = searchParams.get("dataType");
  const filter = { field: "dataType", value: filterValue || "lines" };

  useEffect(() => {}, [filter.value]);

  if (!isToggled) {
    return (
      <Table.Row>
        <TextContent
          original={original}
          translated={translated}
          roman={romanProp}
          hideTranslation={hideTranslation}
          subData={subData}
          fontSize={fontSize}
          filterValue={filterValue}
        />
      </Table.Row>
    );
  }

  return (
    <Table.Row>
      <TextContent
        original={left?.original}
        translated={left?.translated}
        roman={isRomanToggled ? left?.roman : undefined}
        hideTranslation={hideTranslation}
        subData={subData}
        fontSize={fontSize}
        filterValue={filterValue}
      />
      <TextContent
        original={right?.original}
        translated={right?.translated}
        roman={isRomanToggled ? right?.roman : undefined}
        hideTranslation={hideTranslation}
        subData={subData}
        fontSize={fontSize}
        filterValue={filterValue}
      />
    </Table.Row>
  );
}

export default ScreenRow;
