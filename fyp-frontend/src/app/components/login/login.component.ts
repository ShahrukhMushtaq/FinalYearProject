import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(private auth: AuthService, private router: Router, private snotifyService: SnotifyService, private chat: ChatService) { }

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
    if (data.email == undefined || data.password == undefined) {
      this.snotifyService.warning("Incomplete Credentials", this.auth.getConfig())
    }
    else {
      this.auth.login(data)
        .subscribe(res => {
          if (res['status'] == 200) {
            // this.snotifyService.success(res['message'], this.auth.getConfig());
            localStorage.setItem('username', res['content'].user.email)
            this.router.navigate(['user']);
          } else {
            this.snotifyService.warning(res['message'], this.auth.getConfig());
            this.email = '';
            this.password = '';
          }
        }, err => {
          this.snotifyService.error(err.error.message, this.auth.getConfig())
          // console.log(err)
        })
    }
  }

}
