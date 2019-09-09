import {Component, OnInit} from '@angular/core';
import {PizzasService, ToppingsService} from '../../services';
import {Pizza} from '../../models/pizza.model';
import {DrinksService} from '../../services/drinks.service';
import {Category, CategoryType} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';
import {AuthService} from '../../../auth/shared/services/auth.service';
import {Drink} from '../../models/drink.model';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../auth/models/user';
import {Roles} from '../../../auth/models/roles';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  pizzas: Pizza[];
  categories: Category[];
  drinks: Drink[];

  constructor(private  pizzaService: PizzasService,
              private drinkService: DrinksService,
              private toppingService: ToppingsService,
              private categoryService: CategoryService,
              private authService: AuthService) {
  }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(
      cate => {
        this.categories = cate.data;
        this.categories.map(cat => {
          if (cat.type === CategoryType.Pizza) {
            this.pizzaService.getPizzas().subscribe(pizzas => this.pizzas = pizzas);
          }

          if (cat.type === CategoryType.Drink) {
            this.drinkService.getDrinks().subscribe(data => this.drinks = data.data);
          }
        });
      }, (err: HttpErrorResponse) =>
        console.log('Error when getting categories, ', err.message)
    );
  }

}
