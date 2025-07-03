import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetCommonService {

  private baseUrl = `${environment.hostUrl}`;
  constructor(private http: HttpClient) { }
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/domain/countries`);
  }

  getStates(countryCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/domain/states?countryCode=${countryCode}`);
  }

  getCities(stateCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/domain/cities?stateCode=${stateCode}`);
  }

  getCountryName(code: string): Observable<string> {
    return this.getCountries().pipe(
      map((countries) => {
        const country = countries.find(c => c.code === code);
        return country ? country.name : 'Unknown Country';
      })
    );
  }
}
