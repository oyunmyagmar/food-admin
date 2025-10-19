export type CategoryType = {
  _id: string;
  categoryName: string;
  foods: NewFoodType[];
};

export type NewFoodType = {
  _id: string;
  foodName: string;
  price: number;
  categoryId: CategoryType;
  ingredients: string;
  image: string;
};

// before filter
export type NewFoodTypeBeforeEdit = {
  _id: string;
  foodName: string;
  price: number;
  category: string;
  ingredients: string;
  image: string;
};
// hereglegdehgui
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
