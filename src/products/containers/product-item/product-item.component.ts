import {Component, OnInit} from '@angular/core';
import {Pizza} from '../../models/pizza.model';
import {Topping} from '../../models/topping';
import {PizzasService, ToppingsService} from '../../services';
import {ActivatedRoute, Router} from '@angular/router';
import {Message, MessageService, MessageType} from '../../../auth/shared/services/message.service';
import {AuthService} from '../../../auth/shared/services/auth.service';
import {Order, OrderStatusType} from '../../models/order.model';
import {ProductProfile} from '../../models/product-profile.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  pizza: any;
  newPizza: any;
  toppings: Topping[];
  order: Order;

  constructor(private pizzaService: PizzasService,
              private toppingService: ToppingsService,
              private route: ActivatedRoute,
              private router: Router,
              private msgService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      const id = this.route.snapshot.params.id;
      this.pizza = (id === 'new') ? {} : pizzas.find(
        piz => piz.id === id
      );
      this.newPizza = this.pizza;
      this.order = {
        note: '', products: [this.newPizza], deleted: false,
        paymentId: '', status: OrderStatusType.Placed
      };

      this.toppingService.getToppings().subscribe(tops => {
        this.toppings = tops.data;
      }, err => {
        console.log('http toppings', err);
      });
    });
  }

  onSelectTopping(tps: Topping[]) {
    this.newPizza = {...this.newPizza, tps};
    this.order.products.filter(p => p.id === this.newPizza.id)
      .forEach((p: Pizza) => {
        // p.profiles = this.newPizza.profiles;
        p.toppings = this.newPizza.tps;
        // p.toppings.forEach()
      });
  }

  pizzaOnChange(pizza: Pizza) {
    // console.log(pizza);
    this.pizzaService.updatePizza(pizza).subscribe(() => {
      this.router.navigate([`/products/`]);
      this.msgService.set(MessageType.Info, new Message(`${pizza.name} has been changed!`, MessageType.Info));
    }, error => {
      console.log(error);
      this.router.navigate([`auth/login`]);
      this.msgService.set(MessageType.Info, new Message(
        `${pizza.name} change failed! Please try login again with an admin account.`, MessageType.Info));
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
        this.msgService.set(MessageType.Info, new Message(`Delete pizza ${pizza.name} succeed!`, MessageType.Info));
      });
    }

    if (remove && !pizza.id) {
      this.router.navigate([`/products/`]);
      this.msgService.set(MessageType.Info, new Message(`Pizza creating canceled!`, MessageType.Info));
    }
  }

  onUpdateOrder() {
    // console.log('new order ->', this.order);
  }

  onUpdateProfile(profile: ProductProfile) {
    // console.log('new profile ->', profile);
  }

}
