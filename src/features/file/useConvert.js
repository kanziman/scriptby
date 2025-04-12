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

// 새 splitLongDialogue 함수: 문장 경계를 우선으로 분리
function splitLongDialogue(dialogue, maxLen) {
  if (dialogue.length <= maxLen) return [dialogue];
  // 문장 경계로 분리 (마침표, 느낌표, 물음표 뒤에 공백 포함)
  let sentences = dialogue.match(/[^.!?]+[.!?]+[\s]*/g);
  if (!sentences) {
    // 문장 경계를 찾지 못하면 fallback 사용
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
      // 만약 현재 문장이 maxLen보다 크면 단어 단위로 분리
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

export const useConvert = () => {
  const [rightText, setRightText] = useState("");

  const doConvert = (leftText) => {
    const maxLength = 200; // 대사가 이 길이를 초과하면 분리 (필요에 따라 조정)
    const script = leftText;
    const lines = script.split(/\r?\n/);

    let result = [];
    let currentSpeaker = null;
    let currentLine = "";

    // 진행 중인 대화 블록을 결과에 저장하는 헬퍼 함수
    const pushDialogue = () => {
      if (currentSpeaker && currentLine) {
        const cleanedLine = currentLine.replace(/\([^)]*\)/g, "").trim();
        if (cleanedLine.length > maxLength) {
          // 문장 경계에서 분리 (필요시 fallbackWordSplit 사용)
          const parts = splitLongDialogue(cleanedLine, maxLength);
          // 각 분할된 파트마다 "Speaker:"를 붙여서 저장
          parts.forEach((part) => {
            result.push(`${currentSpeaker}: ${part}`);
          });
        } else {
          result.push(`${currentSpeaker}: ${cleanedLine}`);
        }
      }
      currentSpeaker = null;
      currentLine = "";
    };

    lines.forEach((line) => {
      line = line.trim();
      if (!line) return; // 빈 줄은 무시

      // 무시할 항목 조건:
      // 대괄호나 소괄호로 시작, Credits, Break, Scene, End 관련 문구,
      // 숫자만 있는 줄, written/transcribed/adjustments? by 관련 문구,
      // with help from: 로 시작하는 경우
      if (
        line.startsWith("[") ||
        line.startsWith("(") ||
        /Credits|Break|Scene|^End$/i.test(line) ||
        /^[-\s]*\d+\s*[-\s]*$/.test(line) ||
        /(written|transcribed|adjustments?)\s+by/i.test(line) ||
        /^with help from:/i.test(line)
      ) {
        // 진행 중인 대화 블록이 있다면 먼저 저장
        pushDialogue();
        return;
      }

      // "Speaker: 대사" 형식인지 확인
      const match = line.match(/^([A-Za-z .&']+):\s*(.*)/);
      if (match) {
        // 새 대화 블록 시작 전에 기존 블록을 저장
        pushDialogue();
        currentSpeaker = match[1].trim();
        currentLine = match[2].trim();
      } else {
        // 진행 중인 대화 블록이 있다면 이어서 추가
        if (currentSpeaker) {
          currentLine += " " + line;
        }
      }
    });

    // 마지막 대화 블록 처리
    pushDialogue();

    setRightText(result.join("\n"));
    console.log("✅ 대사 정제 완료!");
  };

  return { rightText, doConvert, setRightText };
};
