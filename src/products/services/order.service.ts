import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Drink} from '../models/drink.model';
import {Observable} from 'rxjs';

const URL_DRINK = `${environment.apiUrl}/order`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  createDrink(payload: Drink): Observable<Drink> {
    return this.http.post<Drink>(URL_DRINK, payload);
  }

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(URL_DRINK);
  }

  updateDrink(payload: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${URL_DRINK}/${payload.id}`, payload);
  }

  deleteDrink(payload: Drink): Observable<Drink> {
    return this.http.delete<Drink>(`${URL_DRINK}/${payload.id}`);
  }
}
