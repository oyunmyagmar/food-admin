export type CategoryType = {
  _id: string;
  categoryName: string;
};

export interface FoodType {
  _id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string;
  category?: string;
  createdAt?: Date;
  updated?: Date;
}

export type NewFoodType = {
  _id: string;
  foodName: string;
  price: number;
  category: string;
  ingredients: string;
  image: string;
};
