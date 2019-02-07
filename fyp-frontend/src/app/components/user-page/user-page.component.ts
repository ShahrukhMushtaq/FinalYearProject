import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url == '/user/profile')
      document.getElementById('pof').setAttribute('class', "active nav-link")
  }

  setClass(items) {
    let ul = document.getElementById('uls').getElementsByTagName('a')
    for (let i = 0; i < 6; i++) {
      ul[i].setAttribute("class", "nav-link")
    }
    items.setAttribute("class", "active nav-link")
  }

}
