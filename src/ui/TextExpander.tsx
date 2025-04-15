import { useState } from "react";
import ButtonText from "./ButtonText";

interface TextExpanderProps {
  expanded?: boolean;
  children: string;
  collapsedNumWords?: number;
  expandButtonText?: string;
  collapseButtonText?: string;
}

export default function TextExpander({
  expanded = false,
  children,
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
}: TextExpanderProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const wordCount = children.split(" ").length;

  const displayText = isExpanded
    ? children
    : collapsedNumWords >= wordCount
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

  return (
    <div>
      <p>
        <em>{displayText}</em>
      </p>
      {wordCount > collapsedNumWords && (
        <p>
          <ButtonText onClick={() => setIsExpanded((exp) => !exp)}>
            {isExpanded ? collapseButtonText : expandButtonText}
          </ButtonText>
        </p>
      )}
    </div>
  );
}
