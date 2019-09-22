import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartBarComponent } from './components/cart-bar/cart-bar.component';
import { FetchCartInfoPipe } from './pipes/fetch-cart-info.pipe';



@NgModule({
  declarations: [CartBarComponent, FetchCartInfoPipe],
  exports: [CartBarComponent, FetchCartInfoPipe],
  imports: [
    CommonModule
  ]
})
export class CartModule { }
