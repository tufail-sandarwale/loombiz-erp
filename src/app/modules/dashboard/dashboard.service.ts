import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardByCode(code: string): Observable<any> {
    return this.http.get<any>(`${environment.hostUrl}/dashboard/${code}`);
  }

  getChartOptions(chartType: string): Observable<any> {
    return this.http.get<any>(`${environment.hostUrl}/dashboard/chart/${chartType}`).pipe(
      map(res => {
        res.options = JSON.parse(res.options);
        return res;
      }));
  }

  getChartData(api: string, requestParamsBody: any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.hostUrl}/${api}`, requestParamsBody);
  }
}
