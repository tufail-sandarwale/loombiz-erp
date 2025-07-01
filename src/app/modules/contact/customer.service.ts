import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.hostUrl}` + '/customer');
  }

  getCustomer(id: string) {
    return this.http.get<any>(`${environment.hostUrl}` + '/customer/' + id);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${environment.hostUrl}` + '/customer', customer);
  }

  updateCustomer(id: string, customer: any): Observable<any> {
    return this.http.put(`${environment.hostUrl}` + '/customer/' + id, customer);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${environment.hostUrl}` + '/customer/' + id);
  }

  
}
