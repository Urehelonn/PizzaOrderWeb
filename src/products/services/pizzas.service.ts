import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Topping} from '../models/topping';
import {HttpClient} from '@angular/common/http';
import {Pizza} from '../models/pizza.model';

const PIZZA_URL = 'http://localhost:3000/pizzas';
@Injectable({
  providedIn: 'root'
})
export class PizzasService {


  constructor(private http: HttpClient) {
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(PIZZA_URL, payload);
  }

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(PIZZA_URL);
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${PIZZA_URL}/${payload.id}`, payload);
  }

  deletePizza(payload: Pizza): Observable<Pizza> {
    return this.http.delete<Pizza>(`${PIZZA_URL}/${payload.id}`);
  }


}
