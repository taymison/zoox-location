import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppService } from './app.service';
import { State } from '../interfaces/state';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly header = this.appService.header;

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }

  public createState(state: State): Observable<State> {
    return this.http.post<State>(`${environment.zooxLocationAPI.host}/state`, state, this.header);
  }

  public deleteState(stateId: string): Observable<void> {
    return this.http.delete<void>(`${environment.zooxLocationAPI.host}/state/${stateId}`, this.header);
  }

  public getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${environment.zooxLocationAPI.host}/state`, this.header);
  }

  public getState(stateId: string): Observable<State> {
    return this.http.get<State>(`${environment.zooxLocationAPI.host}/state/${stateId}?withCities=true`, this.header);
  }

  public updateState(stateId: string, state: State): Observable<State> {
    return this.http.put<State>(`${environment.zooxLocationAPI.host}/state/${stateId}`, state, this.header)
  }
}
