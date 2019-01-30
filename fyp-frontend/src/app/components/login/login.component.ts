import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(private auth: AuthService, private router: Router, private snotifyService: SnotifyService) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['user']);
    }
  }

  signIn() {
    let data = {
      email: this.email,
      password: this.password
    }
    this.auth.login(data)
      .subscribe(res => {
        if (res['status'] == 200) {
          this.snotifyService.success(res['message'], this.auth.getConfig());
          this.router.navigate(['user']);
        } else {
          this.snotifyService.warning(res['message'], this.auth.getConfig());
          this.email = '';
          this.password = '';
        }
      }, err => {
        this.snotifyService.error(err.error.message, this.auth.getConfig())
        console.log(err)
      })
  }

}
