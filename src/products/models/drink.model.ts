import {Product} from './product.model';
import {ProductProfile} from './product-profile.model';

export interface Drink extends Product {
  halal?: boolean;
  profile?: ProductProfile[];
}
