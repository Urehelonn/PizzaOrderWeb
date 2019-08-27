import {Component, OnInit} from '@angular/core';
import {Pizza} from '../../models/pizza.model';
import {Topping} from '../../models/topping';
import {PizzasService, ToppingsService} from '../../services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  pizza: Pizza;
  newPizza: Pizza;
  toppings: Topping[];

  constructor(private pizzaService: PizzasService,
              private toppingService: ToppingsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      const id = this.route.snapshot.params.id;
      this.pizza = id === 'new' ?
        {} :
        pizzas.find(
          piz => piz.id === parseInt(id, 10)
        );
      this.newPizza = this.pizza;
      this.toppingService.getToppings().subscribe(tops => {
        this.toppings = tops;
      });
    });
  }

}
