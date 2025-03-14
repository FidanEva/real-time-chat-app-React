import { useTranslation } from "react-i18next";
import { FC } from "react";

export const LanguageController: FC = () => {
    const { i18n, t } = useTranslation();

    const onClickLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
    };

    return (
        <div className="language-controller">
            <select 
                className="language-select"
                onChange={onClickLanguageChange}
                value={i18n.language}
            >
                <option 
                    value="en"
                    className="language-option"
                >
                    {t("languages.english")}
                </option>
                <option 
                    value="az"
                    className="language-option"
                >
                    {t("languages.azerbaijani")}
                </option>
            </select>
        </div>
    );
    
}; 