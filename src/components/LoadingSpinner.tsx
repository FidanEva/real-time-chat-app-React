import { useTranslation } from "react-i18next";

const LoadingSpinner: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="loading-spinner">
            <div className="spinner">{t("general.loading")}</div>
        </div>
    );
};

export default LoadingSpinner;