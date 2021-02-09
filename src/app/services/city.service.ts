import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppService } from './app.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly header = this.appService.header;

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  public createCity(city: City): Observable<City> {
    return this.http.post<City>(`${environment.zooxLocationAPI.host}/city`, city, this.header);
  }

  public deleteCity(cityId: string): Observable<void> {
    return this.http.delete<void>(`${environment.zooxLocationAPI.host}/city/${cityId}`, this.header);
  }

  public getCity(cityId: string): Observable<City> {
    return this.http.get<City>(`${environment.zooxLocationAPI.host}/city/${cityId}?withState=true`, this.header);
  }

  public updateCity(cityId: string, city: City): Observable<City> {
    return this.http.put<City>(`${environment.zooxLocationAPI.host}/city/${cityId}`, city, this.header)
  }
}
