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

  public getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${environment.zooxLocationAPI.host}/state`, this.header);
  }

  public createState(state: State): Observable<State> {
    return this.http.post<State>(`${environment.zooxLocationAPI.host}/state`, state, this.header);
  }
}
