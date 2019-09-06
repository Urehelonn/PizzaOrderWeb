import {Component, OnInit} from '@angular/core';
import {Pizza} from '../../models/pizza.model';
import {Topping} from '../../models/topping';
import {PizzasService, ToppingsService} from '../../services';
import {ActivatedRoute, Router} from '@angular/router';
import {Message, MessageService, MessageType} from '../../../auth/shared/services/message.service';

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
              private router: Router,
              private msgService: MessageService) {
  }

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      const id = this.route.snapshot.params.id;
      this.pizza = (id === 'new') ? {} : pizzas.find(
        piz => piz.id === parseInt(id, 10)
      );
      this.newPizza = this.pizza;
      this.toppingService.getToppings().subscribe(tops => {
        this.toppings = tops;
      });
    });
  }

  onSelect(tps: Topping[]) {
    this.newPizza.toppings = tps;
  }

  pizzaOnChange(pizza: Pizza) {
    this.pizzaService.updatePizza(pizza).subscribe(() => {
      this.router.navigate([`/products/`]);
      this.msgService.set(MessageType.Info, new Message(`${pizza.name} has been changed!`, MessageType.Info));
    });
  }

  pizzaOnCreate(pizza: Pizza) {
    this.pizzaService.createPizza(pizza).subscribe(piz => {
      this.router.navigate([`/products/`]);
      this.msgService.set(MessageType.Info, new Message(`Create pizza ${pizza.name} succeed!`, MessageType.Info));
    });
  }

  pizzaOnDelete(pizza: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove && pizza.id) {
      this.pizzaService.deletePizza(pizza).subscribe(() => {
        this.router.navigate([`/products/`]);
        // this.msgService.set(MessageType.Warning, new Message(`Delete pizza ${pizza.name} succeed!`, MessageType.Warning));
        this.msgService.set(MessageType.Info, new Message(`Delete pizza ${pizza.name} succeed!`, MessageType.Info));
      });
    }

    if (remove && !pizza.id) {
      this.router.navigate([`/products/`]);
      this.msgService.set(MessageType.Info, new Message(`Pizza creating canceled!`, MessageType.Info));
    }
  }

}
