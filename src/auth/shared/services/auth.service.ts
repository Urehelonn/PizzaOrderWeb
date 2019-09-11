import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PizzaError, User} from '../../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Roles} from '../../models/roles';
import {Message, MessageService, MessageType} from './message.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currUserSubj: BehaviorSubject<User>;

  public currUser: Observable<User>;

  constructor(private http: HttpClient,
              private msgService: MessageService,
              private router: Router) {
    if (localStorage.getItem(environment.userStoreKey)) {
      this.checkToken().subscribe(res => {
      }, error => {
        console.log(error);
        this.msgService.set(MessageType.Info,
          new Message('Stored user expired, please login again.', MessageType.Warning));
        this.router.navigateByUrl('/auth/login');
      });
    } else {
      this.router.navigate(['/auth/login']);
    }

    this.currUserSubj = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(environment.userStoreKey)));
    this.currUser = this.currUserSubj.asObservable();
  }

  public get currentUser(): any {
    return this.currUserSubj.value;
  }

  login(username: string, password: string) {
    return this.http.post<PizzaError>(`${environment.apiUrl}/login`,
      {username, password}).pipe(map(res => {
      // console.log(res);
      if (res.data && res.data.token) {
        // store user detail and jwt to local
        localStorage.setItem(environment.userStoreKey, JSON.stringify(res.data));
        this.currUserSubj.next(res.data.user);
      }
      return res;
    }));
  }

  checkToken() {
    return this.http.get<PizzaError>(`${environment.apiUrl}/check`,
      {headers: this.jwt()});
  }

  logout() {
    localStorage.removeItem(environment.userStoreKey);
    this.currUserSubj.next(null);
  }

  hasRight(roles: string[]): boolean {
    if (this.currentUser &&
      this.currentUser.user &&
      this.currentUser.user.role.some(r => roles.indexOf(r.toLowerCase()) > -1)) {
      return true;
    }
    return false;
  }

  get canEditProduct() {
    if (this.currentUser &&
      this.currentUser.user &&
      this.currentUser.user.role.some(r => r.toLowerCase() === Roles.Admin)) {
      return true;
    } else {
      return false;
    }
  }

  // register token header
  private jwt() {
    // register authorization header with jwt token
    const token = JSON.parse(localStorage.getItem('pizza_user_token')).token;
    if (token) {
      return new HttpHeaders().set('Authorization', token);
    }
  }
}
