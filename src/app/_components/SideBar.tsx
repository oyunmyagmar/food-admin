"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaTruckMovingSolid } from "react-icons/lia";
import { SideBarLogoImg } from "./SideBarLogoImg";

export const SideBar = () => {
  return (
    <div className="w-[205px] h-screen bg-background py-9 px-5">
      <div className="flex flex-col gap-10">
        <Link href={"/"}>
          <div className="w-full flex gap-2 items-center">
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
        </Link>

        <div className="flex flex-col gap-6">
          <Button
            asChild
            className="rounded-full gap-2.5 has-[>svg]:px-6 py-2.5 h-10"
          >
            <Link href="/products">
              <LuLayoutDashboard className="size-[22px]" />
              <div className="w-[85px] text-left">Food menu</div>
            </Link>
          </Button>

          <Button
            asChild
            className="rounded-full gap-2.5 has-[>svg]:px-6 py-2.5 h-10"
          >
            <Link href="/orders">
              <LiaTruckMovingSolid className="size-[22px]" />
              <p className="w-[85px] text-left">Orders</p>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
