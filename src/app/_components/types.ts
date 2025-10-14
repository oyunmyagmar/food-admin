export type CategoryType = {
  _id: string;
  name: string;
};

export interface FoodType {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category?: string;
  createdAt?: Date;
  updated?: Date;
}
