import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor/built/config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  style = 'material';
  timeout = 2000;
  position: SnotifyPosition = SnotifyPosition.rightTop;
  progressBar = true;
  closeClick = true;
  newTop = true;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 1000;
  bodyMaxLength = 1000;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private snotifyService: SnotifyService) { }

  login(data) {
    return this.http.post("https://auctions-app.herokuapp.com/api/login", data)
    // return this.http.post("http://localhost:3000/api/login", data)
  }

  isAuthenticated(): boolean {
    let jwt = new JwtHelperService();
    let token = localStorage.getItem('token');
    if (!token) return false;
    let isExpired = jwt.isTokenExpired(token);
    return isExpired;
  }

  registerUser(data) {
    return this.http.post("https://auctions-app.herokuapp.com/api/register", data)
    // return this.http.post("http://localhost:3000/api/register", data)
  }

  getUserProfile() {
    return this.http.get("https://auctions-app.herokuapp.com/api/my/profile")
    // return this.http.get("http://localhost:3000/api/my/profile")
  }

  updateUserProfile(data) {
    return this.http.put(`https://auctions-app.herokuapp.com/api/my/update-profile/${data._id}`, data)
    // return this.http.put(`http://localhost:3000/api/my/update-profile/${data._id}` , data)
  }

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  get CurrentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    return new JwtHelperService().decodeToken(token)
  }

}
