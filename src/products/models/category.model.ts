export enum CategoryType {
  Pizza = 'pizza',
  Drink = 'drink',
  Topping = 'topping'
}

export interface Category {
  id?: string;
  type: CategoryType;
  description: string;
  featured?: boolean;
}
