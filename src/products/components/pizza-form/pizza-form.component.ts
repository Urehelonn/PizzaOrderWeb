import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Pizza} from '../../models/pizza.model';
import {Topping} from '../../models/topping';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.scss']
})
export class PizzaFormComponent implements OnInit, OnChanges {

  exists = false;

  @Input() pizza: Pizza;
  @Input() toppings: Topping[];

  @Output() selected: EventEmitter<Topping[]>;
  @Output() pizzaCreate: EventEmitter<Pizza>;
  @Output() pizzaChangeSave: EventEmitter<Pizza>;
  @Output() pizzaDelete: EventEmitter<Pizza>;


  pform = this.fb.group({
    id: '',
    name: ['', Validators.required],
    toppings: [[]]
  });

  constructor(private fb: FormBuilder) {
    this.selected = new EventEmitter<Topping[]>();
    this.pizzaCreate = new EventEmitter<Pizza>();
    this.pizzaChangeSave = new EventEmitter<Pizza>();
    this.pizzaDelete = new EventEmitter<Pizza>();
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
      this.pizzaCreate.emit(value);
    }
  }

  pizzaOnChange() {
    const {value, valid, touched} = this.pform;
    if (touched && valid) {
      this.pizzaChangeSave.emit({...this.pizza, ...value});
    }
  }

  pizzaOnDelete() {
    const {value, valid} = this.pform;
    this.pizzaDelete.emit(value);
  }
}
