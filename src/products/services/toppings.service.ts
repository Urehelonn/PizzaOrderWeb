import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Topping} from '../models/topping';
import {Observable} from 'rxjs';

const TOPPING_URL = 'http://localhost:3000/toppings';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {


  constructor(private http: HttpClient) {
  }

  getToppings(): Observable<Topping[]> {
    return this.http.get<Topping[]>(TOPPING_URL);
  }
}
