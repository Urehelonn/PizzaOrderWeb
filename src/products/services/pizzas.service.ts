import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Topping} from '../models/topping';
import {HttpClient} from '@angular/common/http';
import {Pizza} from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {

  PIZZA_URL = 'http://localhost:3000/pizzas';

  constructor(private http: HttpClient) {
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.PIZZA_URL, payload);
  }

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.PIZZA_URL);
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.PIZZA_URL}/${payload.id}`, payload);
  }

  deletePizza(payload: Pizza): Observable<Pizza> {
    return this.http.delete<Pizza>(`${this.PIZZA_URL}/${payload.id}`);
  }


}
