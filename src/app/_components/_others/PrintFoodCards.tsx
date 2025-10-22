// import React from "react";
// import Image from "next/image";
// import { EditFoodDialog } from "./_others/EditFoodDialog";
// import { FoodType } from "@/lib/types";

// export const PrintFoodCards = ({
//   foods,
//   getFoods,
//   foodId,
//   foodName,
//   foodImage,
//   foodPrice,
//   foodIngredients,
// }: // categoryId,
// {
//   foods: FoodType[];
//   getFoods: Function;
//   foodId: string;
//   foodName: string;
//   foodImage: string;
//   foodPrice: number;
//   foodIngredients: string;
//   // categoryId: string;
// }) => {
//   return (
//     <div className="w-[270.75px] p-4 border border-border rounded-[20px] flex flex-col gap-5">
//       <div className="w-full h-[129px] rounded-xl relative overflow-hidden">
//         {foodImage ? (
//           <Image
//             src={foodImage}
//             alt="imagePreview"
//             width={270.75}
//             height={129}
//             objectFit="cover"
//             unoptimized
//           />
//         ) : (
//           ""
//         )}
//         <EditFoodDialog
//           foodTitle={foodName}
//           foodPrice={foodPrice}
//           foodIngredients={foodIngredients}
//           foodImage={foodImage}
//           foodId={foodId}
//           getFoods={getFoods}
//         ></EditFoodDialog>
//       </div>

//       <div className="flex flex-col gap-2">
//         <div className="flex items-center gap-2.5">
//           <div className="text-sm leading-5 font-medium text-red-500 flex-1 items-center">
//             {foodName}
//           </div>
//           <div className="text-xs leading-4 text-foreground">${foodPrice}</div>
//         </div>
//         <div className="text-xs leading-4 text-foreground">
//           {foodIngredients}
//         </div>
//       </div>
//     </div>
//   );
// };
