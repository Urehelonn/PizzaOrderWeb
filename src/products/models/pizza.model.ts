import {Topping} from './topping';
import {Product} from './product.model';

export interface Pizza extends Product {
  halal?: boolean;
  toppings?: Topping[];
}
