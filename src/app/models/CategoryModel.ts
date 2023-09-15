export interface CategoryModel {
  id: number;
  name?: Name;
  image?: string;
}

export type Name =
  | "Electronics"
  | "Others"
  | "Change title"
  | "Clothes"
  | "Shoes"
  | "story"
  | "post";
