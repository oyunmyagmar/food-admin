import React, { ChangeEvent, useState, useEffect } from "react";
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
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui";
import { LuPen } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { LuImage } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";

interface Food {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category?: string;
  createdAt?: Date;
  updated?: Date;
}

interface FoodCategory {
  _id: string;
  name: string;
}

export const EditFoodDialog = ({
  foodTitle,
  foodPrice,
  foodIngredients,
  foodImage,
  foodId,
  getFoods,
}: {
  foodTitle: string;
  foodPrice: string | number;
  foodIngredients: string;
  foodImage: string;
  foodId: string;
  getFoods: Function;
}) => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [foodName, setFoodName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File | undefined | string>();
  const [foods, setFoods] = useState<Food[]>([]);

  const [categories, setCategories] = useState<FoodCategory[]>([]);

  // const getFoods = async () => {
  //   const res = await fetch("http://localhost:4000/api/foods");
  //   const resData = await res.json();
  //   const { data } = resData;

  //   setFoods(data);
  // };
  // useEffect(() => {
  //   getFoods();
  // }, []);

  const getCategories = async () => {
    const res = await fetch("http://localhost:4000/api/categories");
    const resData = await res.json();
    const { data } = resData;

    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  // const saveChangeHandler = async () => {
  //   await fetch(`http://localhost:4000/api/foods`, {
  //     method: "PATCH",
  //   });
  // };

  const deleteFoodHandler = async (id: string) => {
    alert(id);
    if (confirm("Are you sure you want to delete this food?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/foods/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Delete failed with status ${response.status}: ${errorText}`
          );
          return;
        }

        const resultText = await response.text();
        console.log(`Delete successful, ${resultText}`);
        await getFoods();
        setEditIsOpen(false);
      } catch (error) {
        console.error("Network or unexpected error:", error);
      }
    }
  };
  const foodNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIngredients(e.target.value);
  };
  const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      const filePreview = URL.createObjectURL(e.target.files[0]);
      setImagePreview(filePreview);
    }
  };

  return (
    <div>
      <Dialog open={editIsOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="absolute w-11 h-11 rounded-full bottom-5 right-5"
            onClick={() => setEditIsOpen(true)}
          >
            <LuPen size={16} className="text-red-500" />
          </Button>
        </DialogTrigger>

        <DialogContent className="w-118 gap-3 rounded-xl">
          <DialogHeader className="gap-0">
            <DialogTitle className="flex gap-2.5 items-center">
              <p className="flex-1 leading-7 text-foreground">Dishes info</p>
              <Button
                variant={"secondary"}
                className="w-9 h-9 rounded-full"
                onClick={() => setEditIsOpen(false)}
              >
                <IoCloseOutline size={16} />
              </Button>
            </DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>

          <div>
            <div className="flex gap-4 my-3">
              <Label
                htmlFor="foodName"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Dish name
              </Label>
              <Input
                id="foodName"
                name="foodName"
                type="text"
                className="text-sm leading-5 py-2"
                defaultValue={foodTitle}
                // onChange={foodNameChangeHandler}
              />
            </div>

            <div className="flex gap-4 my-3">
              <Label
                htmlFor="category"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Dish category
              </Label>

              {/* <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Dishes</SelectLabel>

                    {categories.map((el) => (
                      <SelectItem
                        value={category}
                        key={el._id}
                        // onChange={()=>categoryChangeHandler()}
                      >
                        {el.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select> */}
            </div>

            <div className="flex gap-4 my-3">
              <Label
                htmlFor="ingredients"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Ingredients
              </Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                className="text-sm leading-5 h-20"
                defaultValue={foodIngredients}
                // value={ingredients}
                // onChange={ingredientsChangeHandler}
              />
            </div>

            <div className="flex gap-4 my-3">
              <Label
                htmlFor="price"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                className="text-sm leading-5 py-2"
                defaultValue={foodPrice}
                // value={price}
                // onChange={priceChangeHandler}
              />
            </div>

            <div className="flex gap-4 my-3">
              <Label
                htmlFor="image"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Image
              </Label>

              {image ? (
                <div className="w-full h-29 rounded-md relative overflow-hidden">
                  <Image
                    src={foodImage}
                    alt="imagePreview"
                    fill
                    objectFit="cover"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="absolute w-9 h-9 rounded-full right-2 top-2"
                    onClick={() => {
                      setImage("");
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
                    // onChange={fileChangeHandler}
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
          </div>

          <DialogFooter className="mt-6">
            <div className="w-full flex justify-between items-center">
              <Button
                type="button"
                size={"lg"}
                variant="outline"
                className="border-destructive"
                onClick={() => deleteFoodHandler(foodId)}
              >
                <LuTrash size={16} className="text-destructive" />
              </Button>

              <Button
                type="button"
                size={"lg"}
                className="w-fit leading-5 py-2.5 px-4"
                // onClick={saveChangeHandler}
              >
                Save changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
