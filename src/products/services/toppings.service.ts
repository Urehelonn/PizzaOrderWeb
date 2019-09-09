import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Topping} from '../models/topping';
import {Observable} from 'rxjs';

const TOPPING_URL = 'http://localhost:3838/topping';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {


  constructor(private http: HttpClient) {
  }

  getToppings(): Observable<any> {
    return this.http.get<any>(TOPPING_URL);
  }
}
