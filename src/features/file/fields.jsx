///https://github.com/UgnisSoftware/react-spreadsheet-import
export const fields = [
  {
    label: "Original",
    key: "original",
    fieldType: {
      type: "input",
    },
    alternateMatches: [
      "ORIGINAL",
      "original_text",
      "originalText",
      "original-text",
    ],
    validations: [
      {
        rule: "required",
        errorMessage: "Original text is required",
        level: "error",
      },
    ],
  },
  {
    label: "Translated",
    key: "translated",
    fieldType: {
      type: "input",
    },
    alternateMatches: [
      "TRANSLATED",
      "translated_text",
      "translatedText",
      "translated-text",
    ],
    validations: [
      {
        rule: "required",
        errorMessage: "Translated text is required",
        level: "error",
      },
    ],
  },
  {
    label: "Roman",
    key: "roman",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["ROMAN", "romanized", "romanization", "roman-text"],
    validations: [], // 필수 아님
  },
  {
    label: "Original Words",
    key: "original_words",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["ORIGINAL_WORDS", "originalWords", "original-words"],
    validations: [], // 필수 아님
  },
  {
    label: "Translated Words",
    key: "translated_words",
    fieldType: {
      type: "input",
    },
    alternateMatches: [
      "TRANSLATED_WORDS",
      "translatedWords",
      "translated-words",
    ],
    validations: [], // 필수 아님
  },
  {
    label: "Original Phrases",
    key: "original_phrases",
    fieldType: {
      type: "input",
    },
    alternateMatches: [
      "ORIGINAL_PHRASES",
      "originalPhrases",
      "original-phrases",
      "Original_Phrases",
    ],
    validations: [], // 필수 아님
  },
  {
    label: "Translated Phrases",
    key: "translated_phrases",
    fieldType: {
      type: "input",
    },
    alternateMatches: [
      "TRANSLATED_PHRASES",
      "translatedPhrases",
      "translated-phrases",
      "Translated_Phrases",
    ],
    validations: [], // 필수 아님
  },
  {
    label: "Original Idioms",
    key: "original_idioms",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["ORIGINAL_IDIOMS", "originalIdioms", "original-idioms"],
    validations: [], // 필수 아님
  },
  {
    label: "Translated Idioms",
    key: "translated_idioms",
    fieldType: {
      type: "input",
    },
    alternateMatches: [
      "TRANSLATED_IDIOMS",
      "translatedIdioms",
      "translated-idioms",
    ],
    validations: [], // 필수 아님
  },
];
