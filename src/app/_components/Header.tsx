import { Shell } from "lucide-react";
import React from "react";
import { RiAdminLine } from "react-icons/ri";

export const Header = () => {
  return (
    <header className="w-full h-21 m-0 flex justify-end items-center pr-10">
      <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center">
        <Shell />
      </div>
    </header>
  );
};
