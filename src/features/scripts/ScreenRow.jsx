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
    font-family: "Noto Sans KR", "Noto Sans JP", sans-serif;
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
  /* font-style: italic; */
  color: var(--color-brand-500);
`;

function renderColoredText(text, subData = [], filterValue = "lines") {
  if (!text || !subData || subData.length === 0) return text;

  // === 정제된 패턴 생성 ===
  const cleanedSubData = subData.map((item) => ({
    ...item,
    cleanedOriginal: item.original
      .replace(/（[^）]*）/g, "") // 일본어 괄호 제거
      .replace(/\([^)]*\)/g, "") // 일반 괄호 제거
      .replace("★", "")
      .trim(),
  }));

  const pattern = cleanedSubData
    .map((item) => escapeRegExp(item.cleanedOriginal))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);

  // === 하이라이팅 ===
  return parts.map((part, index) => {
    const lowerPart = part.toLowerCase();
    const isHighlighted = cleanedSubData.some(
      (item) => lowerPart === item.cleanedOriginal.toLowerCase()
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
