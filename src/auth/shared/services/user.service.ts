import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PizzaError, User} from '../../models/user';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<PizzaError>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<PizzaError>(`${environment.apiUrl}/${id}`);
  }

  createUser(user: User) {
    return this.http.post<PizzaError>(`${environment.apiUrl}/users`, user);
  }

  checkUserDuplicated(username: string) {
    return this.http.get<PizzaError>(
      `${environment.apiUrl}/users/checkuser/${username}`);
  }

}
