import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import TRANSLATIONS_EN_JSON from "./en/translation.json";
import TRANSLATIONS_TR_JSON from "./tr/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN_JSON,
      },
      tr: {
        translation: TRANSLATIONS_TR_JSON,
      },
    },
  });

i18n.changeLanguage("tr");