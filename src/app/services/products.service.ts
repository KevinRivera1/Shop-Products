import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductDto, ProductModel } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly API_URL: string = 'http://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) { }

  //Consultar todos los productos
  getAllProducts():Observable<any> {
    return this.http.get(this.API_URL);
  }

  //Consultar un producto por id
  getProductById(id: number):Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  //Crear un producto
  createProduct(productData: CreateProductDto):Observable<any> {
    return this.http.post(`${this.API_URL}`, productData);
  }

  //Actualizar un producto
  updateProduct(id: number, changes: Partial<ProductModel>):Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, changes);
  }

  //Eliminar un producto
  deleteProduct(key: number):Observable<any> {
    return this.http.delete(this.API_URL + '/' + key)
  }

}
