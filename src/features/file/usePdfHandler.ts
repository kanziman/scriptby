import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";
import { useCallback } from "react";
import { useScreenConvert } from "./useScreenConvert";
GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export function usePdfHandler(
  rightText: string,
  setRightText: React.Dispatch<React.SetStateAction<string>>
) {
  GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const { doScreenConvert } = useScreenConvert({ rightText, setRightText });

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;

      let dialogueText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        // 1) 페이지 아이템을 Y 좌표별로 그룹화
        const rows = new Map<number, TextItem[]>();
        content.items.forEach((item) => {
          if (!("str" in item)) return;
          // Y 좌표 반올림해 같은 행으로 묶기
          const y = Math.round(item.transform[5]);
          if (!rows.has(y)) rows.set(y, []);
          rows.get(y)!.push(item as TextItem);
        });

        // 2) 각 행별로 왼쪽 X 최소값을 체크해서 대사만 뽑기
        for (const [, itemsInRow] of rows) {
          const xs = itemsInRow.map((it) => it.transform[4]);
          const minX = Math.min(...xs);
          // 예시 기준: x < 150 이면 ‘장면 설명/내러티브’로 간주 → 건너뛰기
          if (minX < 150) continue;

          // 정렬 후 합치기
          const line = itemsInRow
            .sort((a, b) => a.transform[4] - b.transform[4])
            .map((it) => it.str.trim())
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();

          if (line) dialogueText += line + "\n";
        }
      }

      doScreenConvert(dialogueText);
      console.log("dialogueOnly :>>\n", dialogueText);
    },
    [doScreenConvert]
  );

  return { handleFileChange };
}
