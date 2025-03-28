import styled from "styled-components";

import Table from "../../ui/Table";
import { escapeRegExp } from "../../utils/helpers";

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
  @media (max-width: 50em) {
    & span:first-child {
      font-size: 1.2rem;
    }
    & span:last-child {
      font-size: 1rem;
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

function TextContent({ original, translated, hideTranslation, subData }) {
  return (
    <Stacked>
      <span>{renderColoredText(original, subData)}</span>
      <span>{!hideTranslation && renderColoredText(translated, subData)}</span>
    </Stacked>
  );
}

function ScreenRow({ data, isToggled, hideTranslation, subData }) {
  const { original, translated, left, right } = data;
  if (!isToggled) {
    return (
      <Table.Row>
        <TextContent
          original={original}
          translated={translated}
          hideTranslation={hideTranslation}
          subData={subData}
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
      />
      <TextContent
        original={right?.original}
        translated={right?.translated}
        hideTranslation={hideTranslation}
        subData={subData}
      />
    </Table.Row>
  );
}

// function ScreenRow({ data, isToggled, hideTranslation, subData }) {
//   const { original, translated } = data;

//   return (
//     <Table.Row>
//       {isToggled ? (
//         <>
//           <Stacked>
//             <span>
//               {data.left
//                 ? renderColoredText(data.left.original, subData)
//                 : ""}
//             </span>

//             <span>
//               {!hideTranslation && data.left ? data.left.translated : ""}
//             </span>
//           </Stacked>
//           <Stacked>
//             <span>
//               {data.right
//                 ? renderColoredText(data.right.original, subData)
//                 : ""}
//             </span>
//             <span>
//               {!hideTranslation && data.right ? data.right.translated : ""}
//             </span>
//           </Stacked>
//         </>
//       ) : (
//         <Stacked>
//           <span>{renderColoredText(original, subData)}</span>
//           <span>
//             {!hideTranslation && renderColoredText(translated, subData)}
//           </span>
//         </Stacked>
//       )}
//     </Table.Row>
//   );
// }

export default ScreenRow;
