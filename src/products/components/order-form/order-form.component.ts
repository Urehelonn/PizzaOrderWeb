import {Component, forwardRef} from '@angular/core';
import {Order} from '../../models/order.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {OrderHelper} from '../../../helpers/Order';

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

  constructor() {
  }

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
    let total = null;
    if (!!this.value) {
      total = OrderHelper.totalPrice(this.value.products);
    }
    return total;
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
    console.log('after add pizza', this.value);
    this.onTouch();
    this.onModelChange();
  }

  placeOrder() {
    this.onTouch();
    this.onModelChange(this.value);
  }
}
