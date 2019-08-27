import {Component, OnInit} from '@angular/core';
import {PizzasService} from '../../services';
import {Pizza} from '../../models/pizza.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  pizzas: Pizza[];

  constructor(private  pizzaService: PizzasService) {
  }

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
        this.pizzas = pizzas;
        // console.log(this.pizzas);
      },
      err => {
        console.log(err.message);
      });
  }

}
