import {Product} from './product.model';

export enum OrderStatusType {
  Placed = 'placed',
  Cancelled = 'cancelled',
  Payed = 'payed',
  PayFailed = 'payfailed',
  Delivered = 'delivered',
  Returned = 'returned',
  Refund = 'refund'
}

export interface Order {
  id?: string;
  note?: string;
  status: OrderStatusType;
  paymentId: string;
  deleted: boolean;
  products: Product[];
}
