import {CategoryType} from '../products/models/category.model';
import {Pizza} from '../products/models/pizza.model';
import {Product} from '../products/models/product.model';

export class OrderHelper {
  static totalPrice(products: Product[]): string {
    let total = 0;
    if (products) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const selectedProfiles = product.profiles.filter(pf =>
          pf.selected);
        selectedProfiles.forEach(pf => {
            total += pf.price;
          }
        );

        // if not adding a pizza, skip current product, and continue on calc toppings
        if (!product.category.some(r => r.type === CategoryType.Pizza)) {
          continue;
        }

        // calc topping total price
        const pizza = product as Pizza;

        pizza.toppings.forEach(tp => {
          tp.profiles.filter(p => p.selected).forEach(p => {
            total += p.price;
            // console.log(p.name + ' ' + p.price);
            // console.log(total);
          });
        });
      }
    }
    return total.toFixed(2);
  }
}
