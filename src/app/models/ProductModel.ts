import { CategoryModel } from "./CategoryModel";

export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: CategoryModel;
  creationAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductDto
  extends Omit<ProductModel, "id" | "category"> {
  categoryId: number;
}

export interface UpdateProductDto extends Partial<ProductModel> {
  categoryId?: number;
  creationAt?: Date;
  updatedAt?: Date;
}
