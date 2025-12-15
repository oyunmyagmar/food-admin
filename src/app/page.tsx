"use client";

import React from "react";
import { AdminLayout } from "@/app/_components";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { MousePointerClick } from "lucide-react";

const HomePage = () => {
  const router = useRouter();

  return (
    <AdminLayout>
      <div className="w-[1171px] h-screen ml-6 mr-10 pb-10 bg-secondary">
        <img src={"/hero.png"} alt="" className="opacity-40 h-auto relative" />
        <Button
          variant={"outline"}
          onClick={() => router.push("/")}
          className="absolute z-50 top-100 left-1/2 cursor-pointer"
        >
          Go to Client Panel <MousePointerClick />
        </Button>
      </div>
    </AdminLayout>
  );
};
export default HomePage;
