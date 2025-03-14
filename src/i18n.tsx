import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import az from "./locales/az.json";

const resources = {
  en: {
    translation: en,
  },
  az: {
    translation: az,
  },
};

i18next.use(initReactI18next).init({ resources, lng: "en" });

export default i18next;