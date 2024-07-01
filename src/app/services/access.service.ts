import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { ResponseAccess } from '../interfaces/ResponseAccess';
import { Login } from '../interfaces/Login';
import { ResponseUser } from '../interfaces/ResponseUser';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiurl;

  constructor() { }

  register(object:User): Observable<ResponseUser>{
    return this.http.post<ResponseUser>(`${this.baseUrl}register`, object);
  }

  login(object:Login): Observable<ResponseAccess>{
    return this.http.post<ResponseAccess>(`${this.baseUrl}login`, object);
  }
}
