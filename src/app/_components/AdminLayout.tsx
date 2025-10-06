import React, { ReactNode } from "react";
import { SideBar, Header } from "@/app/_components";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};
