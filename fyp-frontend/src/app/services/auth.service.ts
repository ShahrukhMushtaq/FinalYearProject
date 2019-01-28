import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor/built/config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(data): Observable<HttpResponse<Config>> {
    return this.http.post("http://localhost:3000/api/login", data, { observe: 'response' })
  }

  isAuthenticated(): boolean {
    let jwt = new JwtHelperService();
    let token = localStorage.getItem('token');
    if (!token) return false;
    let isExpired = jwt.isTokenExpired(token);
    return isExpired;
  }

}
