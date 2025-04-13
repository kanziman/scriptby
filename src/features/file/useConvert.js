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

// 문장 경계를 우선으로 대사를 나누되, 문장 경계가 없으면 fallback 사용
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

// 따옴표(" 또는 ') 또는 "..., and" 같은 구분자 기준 분리 (인용부 외부에서 분리)
function splitOutsideQuotes(dialogue, maxLen) {
  if (dialogue.length <= maxLen) return [dialogue];
  let lastValidSplit = -1;
  let insideQuote = false;
  for (let i = 0; i < maxLen; i++) {
    const char = dialogue[i];
    if (char === "'" || char === '"') {
      insideQuote = !insideQuote;
    }
    if (!insideQuote) {
      if (dialogue.slice(i, i + 5) === ", and") {
        lastValidSplit = i + 5;
      }
      if (char === "." || char === "!" || char === "?") {
        lastValidSplit = i + 1;
      }
    }
  }
  if (lastValidSplit > 0) {
    const part1 = dialogue.slice(0, lastValidSplit).trim();
    const part2 = dialogue.slice(lastValidSplit).trim();
    return [part1, part2];
  }
  return null;
}

// ", and " 기준 분리 함수
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

// 기존 splitByQuotes: "..." 기준 분리 함수
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
        // 괄호 안의 내용을 제거하고, 주변 불필요한 공백은 단일 공백으로 치환
        const cleanedLine = currentLine.replace(/\s*\([^)]*\)\s*/g, " ").trim();
        // 길이가 초과하는 경우에만 분리 후보들을 시도합니다.
        if (cleanedLine.length > maxLength) {
          // 우선, 인용부 외부에서 자연스럽게 분리하는 규칙 시도
          let partsCandidate = splitOutsideQuotes(cleanedLine, maxLength);
          if (
            partsCandidate &&
            partsCandidate.length > 1 &&
            partsCandidate.every((p) => p.length <= maxLength)
          ) {
            partsCandidate.forEach((part) => {
              result.push(`${currentSpeaker}: ${part}`);
            });
          } else {
            // 다음으로, ", and " 기준 분리 시도
            partsCandidate = splitByCommaAnd(cleanedLine, maxLength);
            if (
              partsCandidate &&
              partsCandidate.length > 1 &&
              partsCandidate.every((p) => p.length <= maxLength)
            ) {
              partsCandidate.forEach((part) => {
                result.push(`${currentSpeaker}: ${part}`);
              });
            } else {
              // 다음, 따옴표("...") 기준 분리 시도
              partsCandidate = splitByQuotes(cleanedLine, maxLength);
              if (
                partsCandidate &&
                partsCandidate.length > 1 &&
                partsCandidate.every((p) => p.length <= maxLength)
              ) {
                partsCandidate.forEach((part) => {
                  result.push(`${currentSpeaker}: ${part}`);
                });
              } else {
                // 만약 자연스러운 분리 후보를 찾지 못하면, 원본 전체를 하나의 대화로 남깁니다.
                result.push(`${currentSpeaker}: ${cleanedLine}`);
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
        /(teleplay|story|written|transcribed|adjustments?)\s+by/i.test(line) ||
        /^with help from:/i.test(line)
      ) {
        pushDialogue();
        return;
      }
      // 화자 인식 (영어, 한글, 일본어 등 포함 - Unicode 프로퍼티 사용)
      const match = line.match(/^([\p{L} ,.&']+):\s*(.*)/u);
      if (match) {
        const newSpeaker = match[1].trim();
        const newText = match[2].trim();
        if (currentSpeaker && currentSpeaker === newSpeaker) {
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
