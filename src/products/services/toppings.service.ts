import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Topping} from '../models/topping';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {

  TOPPING_URL = 'localhsot://3000/toppings';

  constructor(private http: HttpClient) {
  }

  getToppings(): Observable<Topping[]> {
    return this.http.get<Topping[]>(this.TOPPING_URL);
  }
}
