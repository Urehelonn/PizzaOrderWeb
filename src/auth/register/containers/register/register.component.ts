import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {PizzaError, User} from '../../../models/user';
import {Roles} from '../../../models/roles';
import {Message, MessageService, MessageType} from '../../../shared/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  processing = false;
  nameCheckingSpinnerOn = false;
  usernameInUse = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private msgService: MessageService
  ) {

  }

  ngOnInit() {
  }

  async registerUser(evt: FormGroup) {
    const {username, password} = evt.value;
    const user: User = {
      username, password, role: [Roles.User]
    };
    this.processing = true;

    // TODO: create user duplicated bug report
    this.userService.createUser(user).subscribe(
      (res: PizzaError) => {
        console.log(res);
        this.msgService.set(MessageType.Info,
          new Message(`Create user ${user.username} succeed!`, MessageType.Success));
        this.processing = false;
      }, error => {
        console.log(error);
        this.msgService.set(MessageType.Info,
          new Message(`Create user ${user.username} failed!`, MessageType.Warning));
        this.processing = false;
      });
  }

  onCheckName(username: string) {
    this.nameCheckingSpinnerOn = true;
    console.log(this.nameCheckingSpinnerOn);
    this.userService.checkUserDuplicated(username)
      .subscribe(res => {
        console.log(res);
        if (res.data > 0) {
          this.usernameInUse = true;
        } else {
          this.usernameInUse = false;
        }
        this.nameCheckingSpinnerOn = false;
      }, error => {
        this.nameCheckingSpinnerOn = false;
        this.usernameInUse = true;
        this.msgService.set(MessageType.Info,
          new Message('Server-side error, please try again later', MessageType.Danger));
      });
  }
}
