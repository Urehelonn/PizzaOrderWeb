import {Topping} from './topping';

export interface Pizza {
  id?: number;
  name?: string;
  toppings?: Topping[];
}
