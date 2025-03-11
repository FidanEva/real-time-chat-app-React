import { FC } from "react";
import { ReactNode } from "react";
export const AuthLayout: FC<{children: ReactNode}> = ({ children }) => {
    return (
        <div className="auth-layout">
            <main>{children}</main>
        {/* Add footer or other common elements */}
        </div>
    );
};