"use client";

import React, { Dispatch } from "react";
import { Button, DialogTrigger } from "@/components/ui";
import { LuPen } from "react-icons/lu";

export const EditNewFoodDialogTrigger = ({
  setEditIsOpen,
}: {
  setEditIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <DialogTrigger asChild>
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer absolute w-11 h-11 rounded-full bottom-5 right-5"
        onClick={() => setEditIsOpen(true)}
      >
        <LuPen size={16} className="text-red-500" />
      </Button>
    </DialogTrigger>
  );
};
