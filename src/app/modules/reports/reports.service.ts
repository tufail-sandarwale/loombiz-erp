import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient) { }

  allReports(): Observable<any[]> {
    return this.httpClient.get<any>(`${environment.hostUrl}/reports`);
  }

  setFav(code: string, fav: boolean): Observable<any> {
    let params = new HttpParams();
    params = params.append('fav', fav)
    return this.httpClient.patch<any>(`${environment.hostUrl}/reports/${code}/setFav`, params);
  }
}
