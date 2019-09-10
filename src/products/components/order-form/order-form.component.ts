import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Order, OrderStatusType} from '../../models/order.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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

  @Input() order: Order;
  value: Order;
  isDisabled = false;
  private onTouch;
  private onModelChange;

  constructor() {
    this.order = !!this.order ?
      this.order :
      {
        status: OrderStatusType.Placed, note: '',
        paymentId: '', deleted: false, products: []
      };
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
    const total = 0;
    return total;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  selectedProfile(order: Order) {
    return true;
  }

  selectOrder(order: Order) {
    this.onTouch();
    this.onModelChange(this.value);
  }

}
