import {Component} from '@angular/core';
import {AuthService} from '../auth/shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../auth/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizza-online-order-mentor';
  showMenu = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  toggleMenu() {
    if (!this.authService.currUser) {
      this.router.navigateByUrl('/auth/login');
    } else {
      this.showMenu = !this.showMenu;
    }
  }
}
