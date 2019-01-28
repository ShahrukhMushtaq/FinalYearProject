import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    let data = {
      email: this.email,
      password: this.password
    }
    this.auth.login(data)
      .subscribe(resp => {
        if (resp.body.status == 200) {
          let token = resp.headers.get('x-access-token');
          if (token) {
            localStorage.setItem("token", token);
            this.router.navigate(['user'])
          }
        } else {
          this.email = '';
          this.password = '';
        }
      }, err => {
        console.log(err)
      })
  }
}
