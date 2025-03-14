import Select from "react-select";
import { useTranslation } from "react-i18next";
import { FC } from "react";

export const LanguageController: FC = () => {
    const { i18n, t } = useTranslation();

    const options = [
    { value: "en", label: t("languages.english") },
    { value: "az", label: t("languages.azerbaijani") },
  ];

  const handleChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
        i18n.changeLanguage(selectedOption.value);
    }
  };

  return (
    <div className="language-controller">
    <Select
        className="language-select"
        options={options}
        onChange={handleChange}
        value={options.find((option) => option.value === i18n.language)}
        placeholder={t("languages.selectLanguage")}
        styles={{
        control: (provided) => ({
            ...provided,
            borderRadius: "0.5rem",
            backgroundColor: "var(--bg-input)",
            color: "var(--text-primary)",
            border: "none",
            boxShadow: "none",
            cursor: "pointer",
            "&:hover": {
            outline: "2px solid var(--primary-hover)",
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
            ? "var(--primary-hover)"
            : "var(--bg-main)",
            color: "var(--text-primary)",
            cursor: "pointer",
            padding: "0.5rem 1rem",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "var(--bg-main)",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "var(--text-secondary)",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "var(--text-primary)",
        }),
        }}
    />
    </div>
  );
};