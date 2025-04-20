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
  roman,
}) {
  return (
    <Stacked fontSize={fontSize}>
      {roman && <span className="roman">{roman}</span>}
      <span className="original">{renderColoredText(original, subData)}</span>
      <span className="translated">
        {!hideTranslation && renderColoredText(translated, subData)}
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
      />
      <TextContent
        original={right?.original}
        translated={right?.translated}
        roman={isRomanToggled ? right?.roman : undefined}
        hideTranslation={hideTranslation}
        subData={subData}
        fontSize={fontSize}
      />
    </Table.Row>
  );
}

export default ScreenRow;
