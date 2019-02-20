import { AuthService } from '../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-active-auction',
  templateUrl: './active-auction.component.html',
  styleUrls: ['./active-auction.component.css']
})
export class ActiveAuctionComponent implements OnInit, OnDestroy {
  Auctions = [];
  userData: any;
  showAuctions = false;
  intervalId = 0;
  message = [];
  seconds = 11;
  constructor(private auction: AuctionService, private snotifyService: SnotifyService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUserProfile()
      .subscribe(res => {
        if (res['status'] == 200) {
          this.userData = res['content']
        } else {
          this.snotifyService.warning(res['message'], this.auth.getConfig())
        }
      }, err => {
        this.snotifyService.warning(err.error.message, this.auth.getConfig())
      })
    this.auction.getAuction(this.auth.CurrentUser._id)
      .subscribe(data => {
        if (data['status'] == 200) {
          this.Auctions = data['content']
          this.showAuctions = true;
          this.start();
          this.snotifyService.success(data['message'], this.auth.getConfig())
        } else {
          this.showAuctions = false;
          this.snotifyService.warning(data['message'], this.auth.getConfig())
        }
      }, err => {
        if (err.error.status == 404) {
          this.snotifyService.warning(err.error.message, this.auth.getConfig())
        }
        else this.snotifyService.error("Internet Problem", this.auth.getConfig())
        this.showAuctions = false;
      })

  }

  clearTimer() { clearInterval(this.intervalId); }

  ngOnDestroy() { this.clearTimer(); }

  start() { this.countDown(); }

  private countDown() {
    this.clearTimer();
    this.Auctions.map((auction, i) => {
      this.intervalId = window.setInterval(() => {
        auction.endDate -= 1;
        if (auction.endDate === 0) {
          this.message = [];
        } else {
          let seconds = auction.endDate - Date.now();
          let date = new Date(seconds).getDate();
          let min = new Date(seconds).getMinutes();
          let sec = new Date(seconds).getSeconds()
          if (seconds < 0) { this.message = []; }
          this.message[i] = `${date} Days ${min} Minutes ${sec} Seconds`;
        }
      }, 1000);
    })
  }
}