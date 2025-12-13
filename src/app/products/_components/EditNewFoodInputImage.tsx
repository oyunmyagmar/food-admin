"use client";

import React, { Dispatch } from "react";
import { Button, Label } from "@/components/ui";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { LuImage } from "react-icons/lu";

export const EditNewFoodInputImage = ({
  editedImagePreview,
  setEditedImage,
  setEditedImagePreview,
  fileChangeHandler,
}: {
  editedImagePreview: string;
  setEditedImage: Dispatch<React.SetStateAction<File | undefined>>;
  setEditedImagePreview: Dispatch<React.SetStateAction<string>>;
  fileChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex gap-4 my-3">
      <Label
        htmlFor="image"
        className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
      >
        Image
      </Label>
      {editedImagePreview ? (
        <div className="w-full h-29 rounded-md relative overflow-hidden">
          <Image
            src={editedImagePreview}
            alt="imagePreview"
            width={288}
            height={116}
            className="object-cover w-full h-full"
            unoptimized
          />
          <Button
            type="button"
            variant="outline"
            className="absolute w-9 h-9 rounded-full right-2 top-2"
            onClick={() => {
              setEditedImage(undefined);
              setEditedImagePreview("");
            }}
          >
            <IoCloseOutline size={16} />
          </Button>
        </div>
      ) : (
        <div className="w-full h-29 bg-[#2563EB]/5 flex justify-center items-center p-4 rounded-md border border-dashed border-[#2563EB]/20 relative">
          <input
            id="image"
            name="image"
            type="file"
            className="absolute inset-0 opacity-0"
            onChange={fileChangeHandler}
          />
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-background flex justify-center items-center">
              <LuImage size={16} />
            </div>
            <p className="text-sm leading-5 font-medium text-primary">
              Choose a file or drag & drop it here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
