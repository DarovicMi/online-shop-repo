import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../entity/product';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  url: string = environment.apiBaseUrl; //localhost:8080
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.url}/products`);
  }
  findProductById(productId: number) {
    return this.http.get<Product>(`${this.url}/product/${productId}`);
  }
}
