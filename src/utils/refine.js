export function extractText(node) {
  let txt = "";

  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      txt += child.nodeValue;
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      if (child.localName.toLowerCase() === "br") {
        txt += " "; // 공백으로 처리
      } else if (
        child.childNodes.length === 2 &&
        child.childNodes[0].nodeType === Node.ELEMENT_NODE &&
        child.childNodes[1].nodeType === Node.ELEMENT_NODE
      ) {
        const kanji = extractText(child.childNodes[0]).trim();
        const reading = extractText(child.childNodes[1]).trim();
        txt += `${kanji}(${reading})`;
      } else {
        txt += extractText(child);
      }
    }
  });

  txt = txt.replace(/^\s*-\s*/, "");

  // 전체 괄호 제거 후 텍스트가 남는지 확인
  const cleaned = txt
    .replace(/[（(][^）)]*[）)]/g, "") // 괄호 전체 제거
    .replace(/\u3000/g, " ") // 전각 스페이스 → 일반 스페이스
    .replace(/\s+/g, " ")
    .trim();

  return cleaned ? txt : "";
}

// 틱(t) 값을 초 단위로 바꾸는 함수
export function formatTime(ticks, tickRate = 10000000) {
  const sec = Math.floor(ticks / tickRate);
  if (sec >= 60) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m${s}s`;
  }
  return `${sec}s`;
}

// XML 전용 변환 함수 (중복 제거 포함)
export function doConvertXml(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, "application/xml");
  const ps = Array.from(doc.getElementsByTagName("p"));

  let lastText = null;
  const lines = [];

  ps.forEach((p) => {
    const begin = p.getAttribute("begin") || "";
    const ticks = parseInt(begin.replace(/t$/, ""), 10) || 0;
    const ts = formatTime(ticks);

    const rawText = extractText(p).trim();

    if (!rawText) return;
    if (rawText === "넷플릭스 시리즈") return;
    if (rawText.startsWith("♪")) return;
    if (rawText.startsWith("～♪")) return;

    // === 화자 + 대사 분리 ===
    const match = rawText.match(/^（([^（）]+(?:\([^)]+\))?)）\s*(.*)/);
    if (match) {
      const speaker = match[1]; // 화자 이름 (漢字(ふりがな))
      const content = match[2].trim(); // 대사 내용

      if (!content) return; // 대사가 없으면 스킵!

      const text = `${speaker}: ${content}`;

      if (text !== lastText) {
        lines.push(`${ts}: ${text}`);
        lastText = text;
      }
    } else {
      // 화자가 없는 경우 그냥 출력
      if (rawText !== lastText) {
        lines.push(`${ts}: ${rawText}`);
        lastText = rawText;
      }
    }
  });

  return lines.join("\n");
}
