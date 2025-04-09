import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Spinner from "../../ui/Spinner";
import { fields } from "./fields";
import { translations } from "./translation";

export default function SpreadSheetImport({
  handleOnSubmit,
  isCreating,
  fileName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function downloadSample() {
    const sampleUrl =
      "https://ssjkqrernrlhvyhqpzvp.supabase.co/storage/v1/object/public/images//friends-01-001.xlsx";

    // fetch를 사용하여 blob으로 가져오기
    fetch(sampleUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        // Blob URL 생성
        const blobUrl = URL.createObjectURL(blob);

        // 다운로드 링크 생성
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "friends-01-001.xlsx";

        // 클릭 이벤트 발생 및 정리
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Blob URL 해제
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
        }, 100);
      })
      .catch((error) => {
        console.error("다운로드 중 오류가 발생했습니다:", error);
      });
  }
  return (
    <>
      <>
        {isCreating ? (
          <Spinner></Spinner>
        ) : (
          <ButtonGroup>
            {/* <FaFileExcel color="green" /> */}
            <p>{fileName}</p>
            <Button variation="secondary" onClick={() => setIsOpen(true)}>
              <FormattedMessage id="file.upload" />
            </Button>
            <Button variation="secondary" onClick={downloadSample}>
              <FormattedMessage id="file.download" />
            </Button>
          </ButtonGroup>
        )}
      </>
      <ReactSpreadsheetImport
        translations={{
          ...translations,
        }}
        disabled
        customTheme={{
          colors: {
            background: "white",
            rsi: {
              50: "var(--color-brand-50)",
              100: "var(--color-brand-100)",
              200: "var(--color-brand-200)",
              500: "var(--color-brand-500)",
              600: "var(--color-brand-600)",
              700: "var(--color-brand-700)",
              800: "var(--color-brand-800)",
              900: "var(--color-brand-900)",
            },
          },
          typography: {
            fontSize: "39px", // 기본 글씨 크기
            headerFontSize: "10rem", // 헤더의 글씨 크기
            rowHeight: "40px", // 행 높이 조정
          },
          spacing: {
            cellPadding: "12px", // 셀 내부 여백
            tablePadding: "16px", // 테이블 패딩 조정
          },
          components: {
            UploadStep: {
              baseStyle: {
                heading: {
                  fontSize: "4xl",
                  color: "textColor",
                  mb: "2rem",
                },
              },
            },
            SelectSheetStep: {
              baseStyle: {
                heading: {
                  color: "textColor",
                  mb: 8,
                  fontSize: "5xl",
                },
                radio: { fontSize: "5xl" },
                radioLabel: {
                  color: "textColor",
                  fontSize: "3xl",
                },
              },
            },
          },
        }}
        onClose={() => setIsOpen(false)}
        onSubmit={(data, file) => {
          // const json = JSON.stringify(data.validData, null, 2);
          // console.log("json:", json);

          handleOnSubmit(data?.validData, file.name);
          // DOWNLOAD
          // const blob = new Blob([json], { type: "application/json" });
          // const link = document.createElement("a");
          // link.href = URL.createObjectURL(blob);
          // link.setAttribute("download", `${file.name}.json`);
          // link.click();
        }}
        isOpen={isOpen}
        fields={fields}
      />
    </>
  );
}
