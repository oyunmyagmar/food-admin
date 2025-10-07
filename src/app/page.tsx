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
import { LuPen } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";

const AdminHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState("");

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const filePreview = URL.createObjectURL(file);
      console.log(file);
      setPreview(filePreview);
    }
  }

  return (
    <AdminLayout>
      <div className="h-screen pl-6 pt-6 pr-10 bg-secondary">
        <div className="p-5 bg-white">
          <div className="w-[270.75px] h-[241px] py-2 px-4 border border-dashed border-red-500 flex flex-col items-center justify-center gap-6 rounded-[20px]">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-10 h-10 rounded-full"
                >
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

          <div>Garch ireh card + edit card</div>

          <div className="w-[270.75px] p-4 border border-border rounded-[20px] flex flex-col gap-5">
            <div className="w-[238.75px] h-[129px] rounded-xl relative overflow-hidden">
              <Image src="" alt="" fill objectFit="cover" />

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="absolute w-11 h-11 rounded-full bottom-5 right-5"
                  >
                    <LuPen />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dishes info</DialogTitle>
                    <DialogDescription className="hidden" />
                  </DialogHeader>
                  <div>
                    <p>Dish name</p>
                    <Input></Input>
                  </div>
                  <div>
                    <p>Dish category</p>
                    <Input></Input>
                  </div>
                  <div>
                    <p>Ingredients</p>
                    <Input></Input>
                  </div>
                  <div>
                    <p>Price</p>
                    <Input></Input>
                  </div>
                  <div>
                    <p>Image</p>
                    <Input></Input>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" className="border-destructive">
                      <LuTrash className="text-destructive" />
                    </Button>
                    <Button>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className="text-sm leading-5 font-medium text-red-500 flex-1 items-center">
                  Product Name
                </div>
                <div className="text-xs leading-4 text-foreground">$Pr.Pr</div>
              </div>
              <div className="text-xs leading-4 text-foreground">
                Product Description
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AdminHomePage;
