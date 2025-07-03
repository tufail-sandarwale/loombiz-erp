import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = `${environment.hostUrl}`
   constructor(private http: HttpClient) { }
   
   getNotificationData():Observable<any>{
     return this.http.get<any>(`${this.baseUrl}/erp/notification/settings`);
   }
  
   updateStatus(id: string, data: any): Observable<any> {
    if (!id || !data) {
      console.error("updateStatus() received undefined values:", id, data);
      return new Observable(observer => observer.error("Invalid request parameters"));
    }
    return this.http.put(`${this.baseUrl}/erp/notification/settings/${id}`, data); 
  }
  
}
