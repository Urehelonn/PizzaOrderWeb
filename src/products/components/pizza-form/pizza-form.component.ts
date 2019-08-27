import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pizza} from '../../models/pizza.model';
import {Topping} from '../../models/topping';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.scss']
})
export class PizzaFormComponent implements OnInit, OnChanges {

  @Input() pizza: Pizza;
  @Input() toppings: Topping[];

  pform = this.fb.group({
    name: ['', Validators.required],
    toppings: []
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pizza && this.pizza.id) {
      this.pform.patchValue(this.pizza);
    }
  }

}
