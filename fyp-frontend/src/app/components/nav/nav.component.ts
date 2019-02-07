import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  profilePic;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.getUserProfile()
        .subscribe(res => {
          if (res['status'] == 200) {
            this.profilePic = res['content'].avatar
          }
        })
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}
