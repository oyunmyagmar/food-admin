import React from "react";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui";
import { OrderType } from "@/lib/types";

export const OrderTableFoodsHover = ({ order }: { order: OrderType }) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">{`${order.foodOrderItems.length} foods`}</HoverCardTrigger>
      <HoverCardContent className="w-[263px] p-3 border-0 flex flex-col gap-3 text-xs leading-4 text-foreground shadow-sm">
        {order.foodOrderItems?.map((foodOrderItem) => (
          <div
            key={foodOrderItem.food._id}
            className="flex gap-2.5 items-center"
          >
            {foodOrderItem.food.image && (
              <Image
                src={foodOrderItem.food.image}
                alt={foodOrderItem.food.foodName}
                width={32}
                height={30.97}
                unoptimized
                className="w-8 h-[30.97px] object-cover rounded-sm"
              />
            )}
            <div className="flex-1">{foodOrderItem.food.foodName}</div>
            <div>x {foodOrderItem.quantity}</div>
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
};
