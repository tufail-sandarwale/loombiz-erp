import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  saveCustomer(data:any){
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.CREATE_CUSTOMER,data);
  }
}
