import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './containers/register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from '../logout/containers/logout/logout.component';
import {SharedModule} from '../shared/shared.module';


export const routes: Routes = [
  {path: '', component: RegisterComponent},
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class RegisterModule {
}
