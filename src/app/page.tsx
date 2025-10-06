"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Input,
  Textarea,
} from "@/components/ui";
import { GoPlus } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { LuImage } from "react-icons/lu";
import { AdminLayout } from "@/app/_components";

const AdminHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState("");

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  }

  return (
    <AdminLayout>
      <div className="w-[270.75px] h-[241px] py-2 px-4 border border-dashed border-red-500 flex flex-col items-center justify-center gap-6 rounded-[20px]">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="w-10 h-10 rounded-full">
              <GoPlus size={16} />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[460px] gap-6 rounded-xl">
            <DialogHeader className="gap-0">
              <DialogTitle className="flex gap-2.5 items-center mb-4">
                <p className="flex-1 leading-7 text-foreground">
                  Add new Dish to Appetizers
                </p>
                <Button
                  variant="secondary"
                  className="w-9 h-9 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <IoCloseOutline size={16} />
                </Button>
              </DialogTitle>
              <DialogDescription className="hidden" />
            </DialogHeader>

            <div className="flex gap-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-2">
                  Food name
                </p>
                <Input
                  type="text"
                  placeholder="Type food name"
                  className="text-sm leading-5 py-2"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-2">
                  Food price
                </p>
                <Input
                  type="text"
                  placeholder="Enter price..."
                  className="text-sm leading-5 py-2"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Ingredients
              </p>
              <Textarea
                placeholder="List ingredients..."
                className="text-sm leading-5 h-[90px] w-full"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Food image
              </p>
              {preview ? (
                <div className="w-[412px] h-[138px] rounded-md relative overflow-hidden">
                  <Image src={preview} alt="" fill objectFit="cover" />
                  <Button
                    variant="outline"
                    className="absolute w-9 h-9 rounded-full right-2 top-2"
                    onClick={() => {
                      setPreview("");
                    }}
                  >
                    <IoCloseOutline />
                  </Button>
                </div>
              ) : (
                <div className="w-[412px] h-[138px] bg-[#2563EB]/5 flex justify-center items-center p-4 rounded-md border border-dashed border-[#2563EB]/20 relative">
                  <input
                    type="file"
                    onChange={handleImage}
                    className="absolute inset-0 opacity-0"
                  />
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-background flex justify-center items-center">
                      <LuImage size={16} />
                    </div>
                    <p>Choose a file or drag & drop it here</p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="mt-6">
              <Button className="w-[93px] h-10">Add Dish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="w-[154px] text-center text-sm leading-5 font-medium text-secondary-foreground">
          Add new Dish to Appetizers
        </p>
      </div>
    </AdminLayout>
  );
};
export default AdminHomePage;
