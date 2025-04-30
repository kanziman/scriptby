import { doConvertXml } from "../../utils/refine";

function splitBySentences(text, maxLen) {
  // non-greedy 매치 + 부호 + (공백 또는 문자열 끝)
  const regex = /.*?[.!?]+(?:\s|$)/g;
  const sentences = text.match(regex) || [text];
  let result = [],
    buffer = "";

  for (let s of sentences) {
    if ((buffer + s).length > maxLen) {
      if (buffer) result.push(buffer.trim());
      buffer = s;
    } else {
      buffer += s;
    }
  }
  if (buffer) result.push(buffer.trim());
  return result;
}

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
      // ellipsis 못 찾으면 그냥 공백 기준으로 잘라내기
      const lastSpace = sub.lastIndexOf(" ");
      if (lastSpace > -1) {
        let part = remaining.slice(0, lastSpace);
        parts.push(part.trim());
        remaining = remaining.slice(lastSpace).trim();
      } else {
        // 공백도 못 찾으면 강제 자르기
        parts.push(remaining.slice(0, maxLen).trim());
        remaining = remaining.slice(maxLen).trim();
      }
    }
  }
  if (remaining.length > 0) parts.push(remaining.trim());
  return parts;
}

export const useConvert = ({ rightText, setRightText }) => {
  // const [rightText, setRightText] = useState("");

  const doConvertSpeech = (leftText, { allowSplit = true } = {}) => {
    const maxLength = 300;
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

      // pushDialogue() 수정된 부분
      const cleaned = currentLine
        .replace(/\s*[([][^\])]*[\])]\s*/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const normalized = cleaned
        // 1) ellipsis 그룹: '...' 뒤에 공백이 없으면 한꺼번에 '... ' 으로
        .replace(/\.{3}(?=[^\s])/g, "... ")
        // 2) single punctuation: 마침표·물음표·느낌표 중
        //    • 마침표는 바로 뒤에 또 마침표가 오지 않는 것만 (\.(?!\.))
        //    • 느낌표·물음표는 그대로 ([!?])
        //    뒤에 공백이 없으면 '$1 ' 으로
        .replace(/(\.(?!\.)|[!?])(?=[^\s])/g, "$1 ");

      // 2) 분할 로직
      if (allowSplit && normalized.length > maxLength) {
        // ① 문장 끝 기준으로 먼저 시도
        let parts = splitBySentences(normalized, maxLength);

        // ② 문장 분할이 안 되었으면 ellipsis 기준으로
        if (parts.length === 1) {
          parts = splitByQuotes(normalized, maxLength);
        }

        // ③ 여전히 너무 길면 강제 분할
        if (parts.every((p) => p.length <= maxLength)) {
          parts.forEach((p) => result.push(`${currentSpeaker}: ${p}`));
        } else {
          for (let i = 0; i < normalized.length; i += maxLength) {
            result.push(
              `${currentSpeaker}: ${normalized.slice(i, i + maxLength).trim()}`
            );
          }
        }
      } else {
        result.push(`${currentSpeaker}: ${normalized}`);
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
        // line.startsWith("(") ||
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

  const doConvert = (leftText) => {
    const trimmed = leftText.trim();
    if (trimmed.startsWith("<")) {
      setRightText(doConvertXml(leftText));
    } else {
      setRightText(doConvertSpeech(leftText));
    }
  };

  return { rightText, doConvert, setRightText };
};
