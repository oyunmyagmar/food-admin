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
      <div className="h-screen pl-6 pt-6 pr-10 bg-secondary"></div>
    </AdminLayout>
  );
};
export default AdminHomePage;
