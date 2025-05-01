import { useCallback } from "react";

interface UseScreenConvertProps {
  rightText: string;
  setRightText: React.Dispatch<React.SetStateAction<string>>;
}

export const useScreenConvert = ({
  rightText,
  setRightText,
}: UseScreenConvertProps) => {
  const doConvertSpeech = (raw: string): string => {
    // ── 0) Remove every ( … ) block, even if it spans lines ──
    //     [\s\S] means “any character, including newline”
    raw = raw.replace(/\([\s\S]*?\)/g, "").trim();

    // ── 1) Now split into lines, drop blanks & page-numbers ──
    const lines = raw
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l !== "" && !/^\d+\.?$/.test(l));

    const result: string[] = [];
    // const speakerRe = /^[A-Z][A-Z0-9,\/ ]*:?$/;
    const speakerRe = /^[A-Z][A-Z0-9#\/, ]*:?$/;

    let i = 0;
    while (i < lines.length) {
      if (speakerRe.test(lines[i])) {
        const speaker = lines[i++];
        const dialogueParts: string[] = [];
        while (i < lines.length && !speakerRe.test(lines[i])) {
          dialogueParts.push(lines[i++]);
        }
        if (dialogueParts.length) {
          result.push(`${speaker}: ${dialogueParts.join(" ")}`);
        }
      } else {
        i++;
      }
    }

    return result.join("\n");
  };

  const doScreenConvert = useCallback(
    (leftText: string) => {
      const converted = doConvertSpeech(leftText);
      setRightText(converted);
    },
    [setRightText]
  );

  return { doScreenConvert };
};
