import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoutComponent} from './containers/logout/logout.component';
import {RouterModule, Routes} from '@angular/router';


export const logoutRoute: Routes = [
  {path: '', component: LogoutComponent},
];

@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(logoutRoute)
  ]
})

export class LogoutModule {
}
