import {Category} from './category.model';
import {ProductProfile} from './product-profile.model';

export enum ProductType {
  // can be sold separately
  product = 'product',
  // a part of a main product, cannot be sold separately
  accessory = 'accessory',
  coupon = 'coupon'
}

export interface Product {
  id?: string;
  name: string;
  desc: string;
  img: string;
  type: ProductType;
  profiles: ProductProfile[];
  category: Category[];
  inStock?: boolean;
  deleted?: boolean;
  currency?: string;
}
