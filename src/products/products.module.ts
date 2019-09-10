// ===============================================    ANGULAR MODULES IMPORT    =====================================================
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

// ===================================================    COMPONENTS IMPORT    ============================================================
import {ProductsComponent} from './containers/products/products.component';
import {ProductItemComponent} from './containers/product-item/product-item.component';
import {PizzaDisplayComponent} from './components/pizza-display/pizza-display.component';
import {PizzaFormComponent} from './components/pizza-form/pizza-form.component';
import {PizzaItemComponent} from './components/pizza-item/pizza-item.component';
import {PizzaToppingsComponent} from './components/pizza-toppings/pizza-toppings.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { ProductProfileComponent } from './components/product-file/product-profile.component';

// ===================================================    SERVICES IMPORT    ============================================================
import {ToppingsService} from './services/toppings.service';
import {PizzasService} from './services/pizzas.service';


import * as fromContainers from './containers';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

export const ROUTES: Routes = [
  {path: '', component: fromContainers.ProductsComponent},
  {path: ':id', component: fromContainers.ProductItemComponent},
  {path: 'new', component: fromContainers.ProductItemComponent},
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent,
    PizzaDisplayComponent,
    PizzaFormComponent,
    PizzaItemComponent,
    PizzaToppingsComponent,
    OrderFormComponent,
    ProductProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    ToppingsService,
    PizzasService
  ]
})
export class ProductsModule {
}
