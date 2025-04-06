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
    label: "Original Words",
    key: "original_words",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["ORIGINAL_WORDS", "originalWords", "original-words"],
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
  },
  {
    label: "Original Idioms",
    key: "original_idioms",
    fieldType: {
      type: "input",
    },
    alternateMatches: ["ORIGINAL_IDIOMS", "originalIdioms", "original-idioms"],
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
  },
];
