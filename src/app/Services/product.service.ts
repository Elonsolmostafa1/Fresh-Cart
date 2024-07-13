import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProducts():Observable<any>
  {
      return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  getProductsByPageNumber(page:number , limit:number):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`)
  }
  

  getProductById(id:string):Observable<any>
  {
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  getAllCategories():Observable<any>
  {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  getProductsByCateogry(categoryId:string):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`) 
  }
}
