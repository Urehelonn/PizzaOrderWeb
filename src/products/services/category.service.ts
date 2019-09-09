import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Category} from '../models/category.model';

const URL_CATEGORY = `${environment.apiUrl}/category`;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  createCategory(payload: Category): Observable<Category> {
    return this.http.post<Category>(URL_CATEGORY, payload);
  }

  getCategories(): Observable<any> {
    return this.http.get<Category[]>(URL_CATEGORY);
  }

  updateCategory(payload: Category): Observable<Category> {
    return this.http.put<Category>(`${URL_CATEGORY}/${payload.id}`, payload);
  }

  deleteCategory(payload: Category): Observable<Category> {
    return this.http.delete<Category>(`${URL_CATEGORY}/${payload.id}`);
  }
}
