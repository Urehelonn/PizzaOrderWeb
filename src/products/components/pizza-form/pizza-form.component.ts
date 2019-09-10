import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Pizza} from '../../models/pizza.model';
import {Topping} from '../../models/topping';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Order} from '../../models/order.model';
import {ProductProfile} from '../../models/product-profile.model';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.scss']
})
export class PizzaFormComponent implements OnInit, OnChanges {

  exists = false;

  @Input() pizza: Pizza;
  @Input() toppings: Topping[];
  @Input() canEdit: boolean;
  @Input() order: Order;

  @Output() selected: EventEmitter<Topping[]>;
  @Output() pizzaCreate: EventEmitter<Pizza>;
  @Output() pizzaChangeSave: EventEmitter<Pizza>;
  @Output() pizzaDelete: EventEmitter<Pizza>;
  @Output() updateOrder: EventEmitter<Order>;
  @Output() updateProfile: EventEmitter<ProductProfile>;


  pform = this.fb.group({
    id: '',
    name: ['', Validators.required],
    toppings: [[]],
    order: [],
    profiles: []
  });

  constructor(private fb: FormBuilder) {
    this.selected = new EventEmitter<Topping[]>();
    this.pizzaCreate = new EventEmitter<Pizza>();
    this.pizzaChangeSave = new EventEmitter<Pizza>();
    this.pizzaDelete = new EventEmitter<Pizza>();
    this.updateOrder = new EventEmitter();
    this.updateProfile = new EventEmitter();
  }

  ngOnInit() {
    this.pform.get('toppings').valueChanges.subscribe(
      (val: Topping[]) => {
        this.selected.emit(val);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pizza && this.pizza.id) {
      this.exists = true;
      this.pform.patchValue(this.pizza);

      this.pform.get('toppings').valueChanges.subscribe((value: Topping[]) => {
        this.selected.emit(value);
      });
      this.pform.get('profiles').valueChanges.subscribe((value: ProductProfile) => {
        this.updateProfile.emit(value);
      });
      this.pform.get('order').valueChanges.subscribe((value: Order) => {
        this.updateOrder.emit(value);
      });
      if (this.order) {
        console.log('patch order');
        this.pform.patchValue({...this.pizza, order: this.order});
      }
    }
  }

  get nameControl() {
    return this.pform.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  pizzaOnCreate() {
    const {value, valid} = this.pform;
    if (valid) {
      // extract all ids from toppings and insert back
      const toppings = [];
      value.toppings.forEach(tp => {
        toppings.push(tp.id);
      });
      value.toppings = toppings;
      // console.log(value);
      this.pizzaCreate.emit(value);
    }
  }

  pizzaOnChange() {
    const {value, valid, touched} = this.pform;
    if (touched && valid) {
      // extract all ids from toppings and insert back
      const toppings = [];
      value.toppings.forEach(tp => {
        toppings.push(tp.id);
      });
      value.toppings = toppings;
      // console.log(value);
      this.pizzaChangeSave.emit({...this.pizza, ...value});
    }
  }

  pizzaOnDelete() {
    const {value, valid} = this.pform;
    this.pizzaDelete.emit(value);
  }

  onPlaceOrder() {
    console.log('order place');
  }
}
