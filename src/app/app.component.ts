import {Component, HostListener} from '@angular/core';
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
  showCartBar = false;
  carBarEle: HTMLElement = null;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (!this.carBarEle) {
      this.carBarEle = document.getElementById('cart-bar');
    }
    if (window.pageYOffset > 178) {
      this.showCartBar = true;
    } else{
      this.showCartBar = false;
    }
  }

  toggleMenu() {
    if (!this.authService.currUser) {
      this.router.navigateByUrl('/auth/login');
    } else {
      this.showMenu = !this.showMenu;
    }
  }
}
