"use client";
import { useEffect, useState } from "react";
import { CategoryType, NewFoodType } from "@/lib/types";

export const useFood = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<NewFoodType[]>([]);

  const getCategories = async () => {
    const res = await fetch(
      "https://food-next-backend.vercel.app/api/categories"
    );
    const resData = await res.json();
    const { data } = resData;

    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getNewFoods = async () => {
    const res = await fetch(
      "https://food-next-backend.vercel.app/api/newfoods"
    );
    const resData = await res.json();
    const { data } = resData;

    setFoods(data);
  };

  useEffect(() => {
    getNewFoods();
  }, []);
  return {
    categories,
    foods,
    refetchGetCategories: getCategories,
    refetchGetNewFoods: getNewFoods,
  };
};
