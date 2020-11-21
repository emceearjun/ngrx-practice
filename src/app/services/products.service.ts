import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API_URL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.API_URL);
  }
}
