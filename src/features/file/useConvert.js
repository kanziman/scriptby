import { useState } from "react";
// <p> 안의 텍스트만 재귀적으로 추출
function extractText(node) {
  let txt = "";
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      txt += child.nodeValue;
    } else if (
      child.nodeType === Node.ELEMENT_NODE &&
      child.localName.toLowerCase() === "br"
    ) {
      txt += " ";
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      txt += extractText(child);
    }
  });
  return txt;
}

// 틱(t) 값을 초 단위로 바꾸는 함수
function formatTime(ticks, tickRate = 10000000) {
  const sec = Math.floor(ticks / tickRate);
  if (sec >= 60) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m${s}s`;
  }
  return `${sec}s`;
}

// XML 전용 변환 함수 (중복 제거 포함)
function doConvertXml(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, "application/xml");
  const ps = Array.from(doc.getElementsByTagName("p"));

  let lastText = null;
  const lines = [];

  ps.forEach((p) => {
    // 1) 시간 코드
    const begin = p.getAttribute("begin") || "";
    const ticks = parseInt(begin.replace(/t$/, ""), 10) || 0;
    const ts = formatTime(ticks);

    // 2) 자막 텍스트
    const text = extractText(p).trim();

    // 3) 넷플릭스 시리즈만 예외 제거
    if (text === "넷플릭스 시리즈") return;

    // 4) 바로 전 텍스트와 같으면 스킵
    if (text === lastText) return;

    // 5) 결과에 추가
    lines.push(`${ts}: ${text}`);
    lastText = text;
  });

  return lines.join("\n");
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

  // 기존 speech 전용 변환 로직을 별도 함수로 분리
  const doConvertSpeech = (leftText) => {
    const maxLength = 200;
    const lines = leftText.split(/\r?\n/);
    let result = [];
    let currentSpeaker = null;
    let currentLine = "";

    const pushDialogue = () => {
      if (!currentSpeaker || !currentLine) {
        currentSpeaker = null;
        currentLine = "";
        return;
      }
      const cleaned = currentLine.replace(/\s*\([^)]*\)\s*/g, " ").trim();
      if (cleaned.length > maxLength) {
        // splitOutsideQuotes → splitByCommaAnd → splitByQuotes 순으로 시도
        let parts =
          splitOutsideQuotes(cleaned, maxLength) ||
          (splitByCommaAnd(cleaned, maxLength).length > 1
            ? splitByCommaAnd(cleaned, maxLength)
            : null) ||
          (splitByQuotes(cleaned, maxLength).length > 1
            ? splitByQuotes(cleaned, maxLength)
            : null);
        if (parts && parts.every((p) => p.length <= maxLength)) {
          parts.forEach((p) => result.push(`${currentSpeaker}: ${p}`));
        } else {
          result.push(`${currentSpeaker}: ${cleaned}`);
        }
      } else {
        result.push(`${currentSpeaker}: ${cleaned}`);
      }
      currentSpeaker = null;
      currentLine = "";
    };

    lines.forEach((ln) => {
      const line = ln.trim();
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

      const match = line.match(/^([\p{L} ,.&']+):\s*(.*)/u);
      if (match) {
        const [_, speaker, text] = match;
        if (currentSpeaker === speaker) {
          // 같은 화자 연속: 소문자 시작이면 이어쓰기
          if (text[0] === text[0].toLowerCase()) {
            currentLine += " " + text;
          } else {
            pushDialogue();
            currentSpeaker = speaker;
            currentLine = text;
          }
        } else {
          pushDialogue();
          currentSpeaker = speaker;
          currentLine = text;
        }
      } else if (currentSpeaker) {
        currentLine += " " + line;
      }
    });

    pushDialogue();
    return result.join("\n");
  };

  // doConvert: XML이면 doConvertXml, 아니면 speech 전용 로직
  const doConvert = (leftText) => {
    const trimmed = leftText.trim();
    if (trimmed.startsWith("<")) {
      // XML 텍스트라고 판단하면
      setRightText(doConvertXml(leftText));
    } else {
      // 일반 대사 스크립트
      setRightText(doConvertSpeech(leftText));
    }
  };

  return { rightText, doConvert, setRightText };
};
