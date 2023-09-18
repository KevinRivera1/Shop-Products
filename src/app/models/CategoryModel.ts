export interface CategoryModel {
  id: number;
  name?: Name;
  image?: string;
  creationAt?: Date;
  updatedAt?: Date;
}

export type Name =
  | "Electronics"
  | "Others"
  | "Change title"
  | "Clothes"
  | "Shoes"
  | "story"
  | "post";
