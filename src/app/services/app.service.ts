import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public header = {
    headers: new HttpHeaders({
      'X-Api-Key': environment.zooxLocationAPI.token,
    }),
    'Content-Type': 'application/json',
  };
}
