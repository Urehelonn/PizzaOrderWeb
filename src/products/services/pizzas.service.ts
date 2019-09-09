import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Pizza} from '../models/pizza.model';
import {map, switchMap} from 'rxjs/operators';
import {ToppingsService} from './toppings.service';

const PIZZA_URL = 'http://localhost:3838/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {

  pizzas: Pizza[];

  constructor(private http: HttpClient,
              private toppingService: ToppingsService) {
  }

  createPizza(payload: Pizza): Observable<any> {
    return this.http.post<Pizza>(PIZZA_URL, payload,
      {headers: this.jwt()});
  }

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<any>(PIZZA_URL).pipe(
      switchMap(dataPizza => {
        this.pizzas = dataPizza.data;
        return this.toppingService.getToppings();
      }),
      map(
        toppingData => {
          const toppings = toppingData.data;
          this.pizzas.map(pizza => {
            return pizza.toppings =
              toppings.filter(
                tp => pizza.toppings.some(id => id === tp.id)
              );
          });
          return this.pizzas;
        }
      )
    );
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    // console.log(payload);
    return this.http.patch<Pizza>(`${PIZZA_URL}/${payload.id}`,
      payload, {headers: this.jwt()});
  }

  deletePizza(payload: Pizza): Observable<Pizza> {
    return this.http.delete<Pizza>(`${PIZZA_URL}/${payload.id}`,
      {headers: this.jwt()});
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
