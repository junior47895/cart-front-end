import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url:string=environment.apiUrl+'api/product';

  constructor(public httpClient:HttpClient) { }

  findAll():Observable<any>{
    return this.httpClient.get(this.url);
  }

  save(product:Product):Observable<any>{
    return this.httpClient.post(this.url,product);
  }

  update(product:Product):Observable<any>{
    return this.httpClient.put(this.url,product);
  }

  delete(proId:string):Observable<any>{
    return this.httpClient.delete(this.url+`/${proId}`);
  }

  findById(proId:string):Observable<any>{
    return this.httpClient.get(this.url+`/${proId}`);
  }
}
