import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PizzaError, User} from '../../models/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Roles} from '../../models/roles';

@Injectable({
  providedIn: 'root'
})
export class  AuthService {

  private currUserSubj: BehaviorSubject<User>;

  public currUser: Observable<User>;

  constructor(private http: HttpClient) {
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
}
