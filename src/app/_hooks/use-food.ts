"use client";
import React, { useEffect, useState } from "react";
import { CategoryType, NewFoodType } from "@/lib/types";

export const useFood = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<NewFoodType[]>([]);

  const getCategories = async () => {
    const res = await fetch("http://localhost:4000/api/categories");
    const resData = await res.json();
    const { data } = resData;

    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getNewFoods = async () => {
    const res = await fetch("http://localhost:4000/api/newfoods");
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
