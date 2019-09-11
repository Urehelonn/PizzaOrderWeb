import {Component, forwardRef, Input} from '@angular/core';
import {Order, OrderStatusType} from '../../models/order.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CategoryType} from '../../models/category.model';
import {Pizza} from '../../models/pizza.model';

const ORDER_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OrderFormComponent),
  multi: true
};

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  providers: [ORDER_ACCESSOR]
})
export class OrderFormComponent implements ControlValueAccessor {

  value: Order;
  isDisabled = false;
  private onTouch;
  private onModelChange;

  constructor() {}

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(order: Order): void {
    this.value = order;
  }

  get quantity() {
    let num = 0;
    if (this.value) {
      num = this.value.products.length;
    }
    return num;
  }

  get totalPrice() {
    let total = 0;
    if (this.value) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.value.products.length; i++) {
        const product = this.value.products[i];
        const selectedProfiles = product.profiles.filter(pf =>
          pf.selected);
        selectedProfiles.forEach(pf => {
            total += pf.price;
            // console.log(pf.name + ' ' + pf.price);
            // console.log(total);
          }
        );

        // if adding a pizza, skip current product, and continue on calc toppings
        if (!product.category.some(r => r.type === CategoryType.Pizza)) {
          continue;
        }

        // calc topping total price
        const pizza = product as Pizza;
        pizza.toppings.forEach(tp => {
          tp.profiles.filter(p => p.selected).forEach(p => {
            total += p.price;
            console.log(p.name + ' ' + p.price);
            console.log(total);
          });
        });
      }
    }
    return total.toFixed(2);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  selectedOrder() {
    return true;
  }

  clickOnOrder() {
    this.onTouch();
    this.onModelChange(this.value);
  }

  removeOneProduct() {
    if (this.quantity <= 1) {
      return;
    }
    this.value.products.pop();
    this.onTouch();
    this.onModelChange();
  }

  addOneProduct() {
    if (this.quantity === 0) {
      return;
    }
    this.value.products.push(this.value.products[0]);
    this.onTouch();
    this.onModelChange();
  }
}
