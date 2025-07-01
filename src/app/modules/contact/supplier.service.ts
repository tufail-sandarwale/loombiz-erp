import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.hostUrl}` + '/supplier');
  }

  getSupplier(id: string) {
    return this.http.get<any>(`${environment.hostUrl}` + '/supplier/' + id);
  }

  createSupplier(supplier: any): Observable<any> {
    return this.http.post<any>(`${environment.hostUrl}` + '/supplier', supplier);
  }

  updateSupplier(id: string, supplier: any): Observable<any> {
    return this.http.put(`${environment.hostUrl}` + '/supplier/' + id, supplier);
  }

  deleteSupplier(id: string): Observable<any> {
    return this.http.delete(`${environment.hostUrl}` + '/supplier/' + id);
  }

  
}
