type CategoriesType = {
  name: string;
  color: string;
  id: number;
};
type ProductsType = {
  name: string;
  category: CategoriesType;
  price: string;
  id: number;
};
type UsersType = {
  email: string;
  password: string;
  id: number;
};

type ColorObjectType = {
  hex: string;
  default: string;
};
type CategoryOptions = {
  label: string;
  value: number;
  data: CategoriesType;
};
export type {
  UsersType,
  CategoriesType,
  ColorObjectType,
  ProductsType,
  CategoryOptions,
};
