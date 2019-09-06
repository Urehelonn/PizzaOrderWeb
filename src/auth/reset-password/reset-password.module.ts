import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResetPasswordComponent} from './containers/reset-password/reset-password.component';
import {RouterModule, Routes} from '@angular/router';


export const routes: Routes = [
  {path: '', component: ResetPasswordComponent},
];

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ResetPasswordModule {
}
