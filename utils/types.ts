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
  profilePic: string;
  fullname: string;
  birthday: number;
  gender: string;
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
type ProductFormData = {
  productName: string;
  productPrice: string;
  productCategory: CategoryOptions | null;
};
type CategoryFormData = {
  categoryName: string;
  selectedColor: ColorObjectType;
};
export type {
  UsersType,
  CategoriesType,
  ColorObjectType,
  ProductsType,
  CategoryOptions,
  ProductFormData,
  CategoryFormData,
};
