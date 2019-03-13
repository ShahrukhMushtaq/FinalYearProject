import { Component } from '@angular/core';
import { SwUpdate, SwPush } from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private updates: SwUpdate) {
    updates.available.subscribe(ev => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }
  ngOnInit() {
    this.updates.available.subscribe((ev) => {
      window.location.reload();
    });
  }
}
