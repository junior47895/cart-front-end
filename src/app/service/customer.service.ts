import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public url:string=environment.apiUrl+'/api/customer';

  constructor(public httpClient:HttpClient) { }

  findAll():Observable<any>{
    return this.httpClient.get(this.url);
  }

  save(customer:Customer):Observable<any>{
    return this.httpClient.post(this.url,customer);
  }

  update(customer:Customer):Observable<any>{
    return this.httpClient.put(this.url,customer);
  }

  delete(email:string):Observable<any>{
    return this.httpClient.delete(this.url+`/${email}`);
  }

  findById(email:string):Observable<any>{
    return this.httpClient.get(this.url+`/${email}`);
  }

}
