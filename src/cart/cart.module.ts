import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartBarComponent } from './components/cart-bar/cart-bar.component';
import { FetchCartInfoPipeComponent } from './pipes/fetch-cart-info-pipe/fetch-cart-info-pipe.component';



@NgModule({
  declarations: [CartBarComponent, FetchCartInfoPipeComponent],
  exports: [CartBarComponent, FetchCartInfoPipeComponent],
  imports: [
    CommonModule
  ]
})
export class CartModule { }
