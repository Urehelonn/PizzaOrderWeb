import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Drink} from '../models/drink.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const URL_DRINK = `${environment.apiUrl}/drink`;
@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  constructor(private http: HttpClient) {
  }

  createDrink(payload: Drink): Observable<Drink> {
    return this.http.post<Drink>(URL_DRINK, payload);
  }

  getDrinks(): Observable<any> {
    return this.http.get<any>(URL_DRINK);
  }

  updateDrink(payload: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${URL_DRINK}/${payload.id}`, payload);
  }

  deleteDrink(payload: Drink): Observable<Drink> {
    return this.http.delete<Drink>(`${URL_DRINK}/${payload.id}`);
  }
}
