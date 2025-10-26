import React, { ReactNode } from "react";
import { SideBar, Header } from "@/app/_components";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex justify-center bg-secondary m-0">
      <SideBar />
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
};
