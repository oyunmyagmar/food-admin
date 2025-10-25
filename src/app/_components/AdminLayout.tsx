import React, { ReactNode } from "react";
import { SideBar, Header } from "@/app/_components";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-360 h-screen flex m-0">
      <SideBar />
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};
