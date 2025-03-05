import { FC } from "react";
import { ReactNode } from "react";
import NavBar from "./NavBar";
  
export const MainLayout: FC<{children: ReactNode}> = ({ children }) => {
    return (
        <div className="main-layout">
        <NavBar />
        <main>{children}</main>
        {/* Add footer or other common elements */}
        </div>
    );
};