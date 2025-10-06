import React from "react";
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

const AdminPage = () => {
  return (
    <div className="w-[270.75px] h-[241px] py-2 px-4 border border-border flex flex-col items-center justify-center rounded-[20px]">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" className="w-10 h-10 rounded-full">
            <GoPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[452px] h-[596px]">
          <DialogHeader>
            <DialogTitle>Dishes info</DialogTitle>
            <DialogDescription></DialogDescription>
            <div>
              <p>Dish name</p>
              <Input />
            </div>
            <div>
              <p>Dish category</p>
              <Input />
            </div>
            <div>
              <p>Ingredients</p>
              <Input />
            </div>
            <div>
              <p>Price</p>
              <Input />
            </div>
            <div>
              <p>Image</p>
              <Input />
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="destructive">
              Close
            </Button>
            <Button type="button">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="mt-6 w-[154px] text-center">Add new Dish to Appetizers </p>
    </div>
  );
};
export default AdminPage;
