import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {PizzaError} from '../../../models/user';
import {Message, MessageService, MessageType} from '../../../shared/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router, private msgService: MessageService) {
  }

  ngOnInit() {
  }

  loginUser(evt: FormGroup) {
    const {username, password} = evt.value;
    this.authService.login(username, password).subscribe((obj: PizzaError) => {
      console.log('login res: ', obj);
      this.router.navigate(['/']);
    }, error => {
      console.log('login failed, with following error: ');
      console.log(error);
      this.msgService.set(MessageType.Info, new Message('Login failed!', MessageType.Danger));
    });
  }

}
