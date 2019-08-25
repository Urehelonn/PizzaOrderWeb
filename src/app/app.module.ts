import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path: 'products', loadChildren: '../products.products.module#ProductsModule'},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
