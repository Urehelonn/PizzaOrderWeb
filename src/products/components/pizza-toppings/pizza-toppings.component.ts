import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Topping} from '../../models/topping';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaToppingsComponent),
  multi: true
};

@Component({
  selector: 'app-pizza-toppings',
  templateUrl: './pizza-toppings.component.html',
  styleUrls: ['./pizza-toppings.component.scss'],
  providers: [PIZZA_TOPPINGS_ACCESSOR]
})
export class PizzaToppingsComponent implements ControlValueAccessor {


  @Input() toppings: Topping;
  value: Topping[];
  isDisabled: boolean = false;

  constructor() {
  }

  private onTouch;

  private onModelChange;

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(toppings: Topping[]): void {
    this.value = toppings;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


}
