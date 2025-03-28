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
    label: "Original Phrasal Verbs",
    key: "original_phrasal_verbs",
    fieldType: {
      type: "input",
    },
    alternateMatches: [
      "ORIGINAL_PHRASAL_VERBS",
      "originalPhrasalVerbs",
      "original-phrasal-verbs",
      "Original_Phrasal_Verbs",
    ],
  },
  {
    label: "Translated Phrasal Verbs",
    key: "translated_phrasal_verbs",
    fieldType: {
      type: "input",
    },
    alternateMatches: [
      "TRANSLATED_PHRASAL_VERBS",
      "translatedPhrasalVerbs",
      "translated-phrasal-verbs",
      "Translated_Phrasal_Verbs",
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
