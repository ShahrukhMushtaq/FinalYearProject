import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  setClass(items) {
    let ul = document.getElementById('uls').getElementsByTagName('a')
    for (let i = 0; i < 6; i++) {
      ul[i].setAttribute("class", "nav-link")
    }
    items.setAttribute("class", "active nav-link")
  }

}
