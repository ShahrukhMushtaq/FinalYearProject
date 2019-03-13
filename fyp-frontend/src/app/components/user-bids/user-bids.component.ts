import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuctionService } from '../../services/auction.service';
import { SnotifyService } from 'ng-snotify';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-bids',
  templateUrl: './user-bids.component.html',
  styleUrls: ['./user-bids.component.css']
})
export class UserBidsComponent implements OnInit {
  Auctions;
  username = localStorage.getItem('username')
  callBid = false;
  bidInfo = [];
  bidInfo1 = [];
  Userbid = [];
  constructor(private auction: AuctionService, private snotifyService: SnotifyService, private auth: AuthService, private modalService: BsModalService) { }

  ngOnInit() {
    this.auction.getAllBids()
      .subscribe(data => {
        // console.log(data)
        if (data['status'] == 200) {
          for (let i = 0; i < data['content'].length; i++) {
            this.bidInfo.push(data['content'][i].bidInfo)
          }
        }
        console.log(this.bidInfo)
        for (let j = 0; j < this.bidInfo.length; j++) {
          for (let k = 0; k < this.bidInfo[j].length; k++) {
            this.bidInfo1.push(this.bidInfo[j][k])
          }
        }
        console.log(this.bidInfo1)
        this.bidInfo1.map(bid => {
          if (bid.user == this.auth.CurrentUser._id) {
            this.Userbid.push(bid)
          }
        })
      }, err => {
        this.snotifyService.error("Internet Problem", this.auth.getConfig())
      })

  }
}