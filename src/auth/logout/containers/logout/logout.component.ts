import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
    if (!this.authService.currentUser) {
      this.router.navigate(['/auth/login']);
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  onStayHere() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
