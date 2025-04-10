import { useState } from "react";

export const useConvert = () => {
  const [rightText, setRightText] = useState("");

  const doConvert = (leftText) => {
    const lines = leftText.split(/\r?\n/);
    let result = [];
    let currentSpeaker = null;
    let currentLine = "";

    lines.forEach((line) => {
      line = line.trim();

      if (
        line.startsWith("[") ||
        line.startsWith("(") ||
        /Credits|Break|Scene|^End$/i.test(line) ||
        /^[-\s]*\d+\s*[-\s]*$/.test(line) ||
        /(written|transcribed|adjustments?)\s+by/i.test(line)
      ) {
        return;
      }

      const match = line.match(/^([A-Za-z., '&]+):\s*(.+)/);
      if (match) {
        // 중간 저장 시
        if (currentSpeaker && currentLine) {
          const cleanedLine = currentLine.replace(/\([^)]*\)/g, "").trim();
          if (cleanedLine) {
            result.push(`${currentSpeaker}: ${cleanedLine}`);
          }
          currentSpeaker = null;
          currentLine = "";
        }
        currentSpeaker = match[1].trim();
        currentLine = match[2].trim();
      } else {
        if (currentSpeaker) {
          currentLine += " " + line;
        }
      }
    });

    // 마지막 저장 시
    if (currentSpeaker && currentLine) {
      const cleanedLine = currentLine.replace(/\([^)]*\)/g, "").trim();
      if (cleanedLine) {
        result.push(`${currentSpeaker}: ${cleanedLine}`);
      }
    }

    setRightText(result.join("\n"));
  };

  return { rightText, doConvert, setRightText };
};
