"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { LiaTruckMovingSolid } from "react-icons/lia";
import { SideBarLogoImg } from "@/app/_components";
import { usePathname, useRouter } from "next/navigation";

export const SideBar = () => {
  const currentPathname = usePathname();
  const router = useRouter();
  const sideBarBtns = [
    {
      btnName: "Food menu",
      btnPath: "/products",
      btnIcon: <LuLayoutDashboard className="size-[22px]" />,
    },
    {
      btnName: "Orders",
      btnPath: "/orders",
      btnIcon: <LiaTruckMovingSolid className="size-[22px]" />,
    },
  ];
  const handleBtn = (btnPath: string) => {
    router.push(`${btnPath}`);
  };

  return (
    <div className="w-[205px] bg-background py-9 px-5">
      <div className="flex flex-col gap-10">
        <div
          onClick={() => router.push("/")}
          className="w-full flex gap-2 items-center cursor-pointer"
        >
          <SideBarLogoImg />
          <div className="flex-1">
            <div className="text-lg leading-7 font-semibold text-foreground">
              NomNom
            </div>
            <div className="text-xs leading-4 text-muted-foreground">
              Swift delivery
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          {sideBarBtns.map((sideBarBtn) => (
            <Button
              key={sideBarBtn.btnName}
              onClick={() => handleBtn(sideBarBtn.btnPath)}
              id={sideBarBtn.btnPath}
              asChild
              size={"lg"}
              className={`rounded-full cursor-pointer justify-start gap-2.5 hover:none ${
                currentPathname === sideBarBtn.btnPath
                  ? "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  : "bg-background text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              <div>
                <div>{sideBarBtn.btnIcon}</div>
                <div className="w-[85px]">{sideBarBtn.btnName}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
