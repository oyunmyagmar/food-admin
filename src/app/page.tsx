"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { GoPlus } from "react-icons/go";
import { Input } from "@/components/ui/input";
import { IoCloseOutline } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";

const AdminPage = () => {
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
            <div className="w-[412px] h-[138px] bg-[#2563EB0D] flex justify-center items-center">
              <Input type="file" onChange={handleImage} />
            </div>
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
  );
};
export default AdminPage;
