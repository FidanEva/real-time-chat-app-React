import { FC } from "react";
import { ReactNode } from "react";
import { LanguageController } from "./LanguageController";

export const AuthLayout: FC<{children: ReactNode}> = ({ children }) => {
    return (
        <div className="auth-layout">
            <LanguageController />
            <main>{children}</main>
        {/* Add footer or other common elements */}
        </div>
    );
};