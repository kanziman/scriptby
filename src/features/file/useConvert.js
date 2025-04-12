import { useState } from "react";

// fallback: 단어 단위 분리 (문장 경계가 없을 때 사용)
function fallbackWordSplit(dialogue, maxLen) {
  const words = dialogue.split(" ");
  let lines = [];
  let currentLine = "";
  words.forEach((word) => {
    if ((currentLine + word).length > maxLen) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  });
  if (currentLine.trim()) lines.push(currentLine.trim());
  return lines;
}

// 문장 경계를 우선으로 대사를 나누되, 없으면 fallback 사용
function splitLongDialogue(dialogue, maxLen) {
  if (dialogue.length <= maxLen) return [dialogue];
  let sentences = dialogue.match(/[^.!?]+[.!?]+[\s]*/g);
  if (!sentences) {
    return fallbackWordSplit(dialogue, maxLen);
  }
  let parts = [];
  let currentPart = "";
  for (const sentence of sentences) {
    if ((currentPart + sentence).length <= maxLen) {
      currentPart += sentence;
    } else {
      if (currentPart.trim().length > 0) {
        parts.push(currentPart.trim());
      }
      if (sentence.trim().length > maxLen) {
        const fallbackParts = fallbackWordSplit(sentence.trim(), maxLen);
        parts.push(...fallbackParts);
        currentPart = "";
      } else {
        currentPart = sentence;
      }
    }
  }
  if (currentPart.trim().length > 0) {
    parts.push(currentPart.trim());
  }
  return parts;
}

// 따옴표(" 또는 ') 또는 "..., and" 같은 구분자 기준 분리 (우선적으로 인용부 외부에서 분리)
function splitOutsideQuotes(dialogue, maxLen) {
  if (dialogue.length <= maxLen) return [dialogue];
  let lastValidSplit = -1;
  let insideQuote = false;
  // maxLen 내에서 앞에서부터 순회하며, 인용부 외부에서 적절한 분리 위치(예: ", and " 또는 문장부호)를 찾는다.
  for (let i = 0; i < maxLen; i++) {
    const char = dialogue[i];
    if (char === "'" || char === '"') {
      insideQuote = !insideQuote;
    }
    // 인용부 외부에서 분리 가능한 위치 업데이트:
    // 예: ", and " 또는 문장부호(. ! ?)
    if (!insideQuote) {
      if (dialogue.slice(i, i + 5) === ", and") {
        lastValidSplit = i + 5;
      }
      if (!insideQuote && (char === "." || char === "!" || char === "?")) {
        lastValidSplit = i + 1;
      }
    }
  }
  // 만약 적절한 분리 위치를 찾았다면 해당 위치에서 분할
  if (lastValidSplit > 0) {
    const part1 = dialogue.slice(0, lastValidSplit).trim();
    const part2 = dialogue.slice(lastValidSplit).trim();
    return [part1, part2];
  }
  return null;
}

export const useConvert = () => {
  const [rightText, setRightText] = useState("");

  const doConvert = (leftText) => {
    const maxLength = 200; // 이 길이를 초과하면 대사를 분리합니다.
    const script = leftText;
    const lines = script.split(/\r?\n/);

    let result = [];
    let currentSpeaker = null;
    let currentLine = "";

    // 진행 중인 대화 블록을 결과에 저장하는 헬퍼 함수
    const pushDialogue = () => {
      if (currentSpeaker && currentLine) {
        // 괄호 안 내용을 제거하며, 양쪽 공백은 단일 공백으로 치환
        const cleanedLine = currentLine.replace(/\s*\([^)]*\)\s*/g, " ").trim();
        if (cleanedLine.length > maxLength) {
          // 우선, 인용부 외부에서 자연스럽게 분리하는 규칙 시도
          let partsBySplit = splitOutsideQuotes(cleanedLine, maxLength);
          if (
            partsBySplit &&
            partsBySplit.length > 1 &&
            partsBySplit.every((p) => p.length <= maxLength)
          ) {
            partsBySplit.forEach((part) => {
              result.push(`${currentSpeaker}: ${part}`);
            });
          } else {
            // 다음으로, ", and " 기준 분리 시도
            let partsByCommaAnd = splitByCommaAnd(cleanedLine, maxLength);
            if (
              partsByCommaAnd.length > 1 &&
              partsByCommaAnd.every((p) => p.length <= maxLength)
            ) {
              partsByCommaAnd.forEach((part) => {
                result.push(`${currentSpeaker}: ${part}`);
              });
            } else {
              // 그 외에는 따옴표("...") 기준 분리 시도
              let partsByQuotes = splitByQuotes(cleanedLine, maxLength);
              if (
                partsByQuotes.length > 1 &&
                partsByQuotes.every((p) => p.length <= maxLength)
              ) {
                partsByQuotes.forEach((part) => {
                  result.push(`${currentSpeaker}: ${part}`);
                });
              } else {
                // 마지막으로 문장/단어 기준 분리
                const parts = splitLongDialogue(cleanedLine, maxLength);
                parts.forEach((part) => {
                  result.push(`${currentSpeaker}: ${part}`);
                });
              }
            }
          }
        } else {
          result.push(`${currentSpeaker}: ${cleanedLine}`);
        }
      }
      currentSpeaker = null;
      currentLine = "";
    };

    // 기존 splitByQuotes: "..." 기준 분리 (이전 로직 유지)
    function splitByQuotes(dialogue, maxLen) {
      let parts = [];
      let remaining = dialogue;
      const ellipsis = "...";
      while (remaining.length > maxLen) {
        const sub = remaining.slice(0, maxLen);
        const lastEllipsis = sub.lastIndexOf(ellipsis);
        if (lastEllipsis > -1) {
          let part = remaining.slice(0, lastEllipsis + ellipsis.length);
          parts.push(part.trim());
          remaining = remaining.slice(lastEllipsis + ellipsis.length).trim();
        } else {
          break;
        }
      }
      if (remaining.length > 0) parts.push(remaining.trim());
      return parts;
    }

    // 기존 splitByCommaAnd: ", and " 기준 분리 함수
    function splitByCommaAnd(dialogue, maxLen) {
      let parts = [];
      let remaining = dialogue;
      const separator = ", and ";
      while (remaining.length > maxLen) {
        const sub = remaining.slice(0, maxLen);
        const lastSep = sub.lastIndexOf(separator);
        if (lastSep > -1) {
          let part = remaining.slice(0, lastSep + separator.length);
          parts.push(part.trim());
          remaining = remaining.slice(lastSep + separator.length).trim();
        } else {
          break;
        }
      }
      if (remaining.length > 0) parts.push(remaining.trim());
      return parts;
    }

    lines.forEach((line) => {
      line = line.trim();
      if (!line) {
        pushDialogue();
        return;
      }

      if (
        line.startsWith("[") ||
        line.startsWith("(") ||
        /Credits|Break|Scene|^End$/i.test(line) ||
        /^[-\s]*\d+\s*[-\s]*$/.test(line) ||
        /(written|transcribed|adjustments?)\s+by/i.test(line) ||
        /^with help from:/i.test(line)
      ) {
        pushDialogue();
        return;
      }

      // 화자 인식 (영어, 한글, 일본어 등 포함)
      const match = line.match(/^([\p{L} ,.&']+):\s*(.*)/u);
      if (match) {
        const newSpeaker = match[1].trim();
        const newText = match[2].trim();
        if (currentSpeaker && currentSpeaker === newSpeaker) {
          // 만약 새 대사의 첫 글자가 소문자면 이어진 대사로 처리
          if (newText && newText[0] === newText[0].toLowerCase()) {
            currentLine += " " + newText;
          } else {
            pushDialogue();
            currentSpeaker = newSpeaker;
            currentLine = newText;
          }
        } else {
          pushDialogue();
          currentSpeaker = newSpeaker;
          currentLine = newText;
        }
      } else {
        if (currentSpeaker) {
          currentLine += " " + line;
        }
      }
    });

    pushDialogue();

    setRightText(result.join("\n"));
    console.log("✅ 대사 정제 완료!");
  };

  return { rightText, doConvert, setRightText };
};
