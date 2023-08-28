type CategoriesType = {
  name: string;
  color: string;
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

export type { UsersType, CategoriesType, ColorObjectType };
