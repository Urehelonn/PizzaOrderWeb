import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from './shared/components/message/message.component';
import {MessageService} from './shared/services/message.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';


export const authRoutes: Routes = [
  {
    path: 'auth', children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', loadChildren: './login/login.module#LoginModule'},
      {path: 'logout', loadChildren: './logout/logout.module#LogoutModule'},
      {path: 'register', loadChildren: './register/register.module#RegisterModule'},
      {path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordModule'},
    ]
  },
];

@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule
  ],
  exports: [
    MessageComponent
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [MessageService]
    };
  }
}
