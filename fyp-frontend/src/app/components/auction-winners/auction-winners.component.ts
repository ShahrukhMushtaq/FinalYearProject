import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuctionService } from "../../services/auction.service";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-winners',
  templateUrl: './auction-winners.component.html',
  styleUrls: ['./auction-winners.component.css']
})
export class AuctionWinnersComponent implements OnInit {
  fullDetails;
  messages = [];
  auctions = [];
  bids = [];
  expiredmessages = [];
  expiredauctions = [];
  expiredbids = [];
  showWinners = false;
  winnerName = []
  constructor(private auction: AuctionService) { }

  ngOnInit() {
    if (this.auction.getExpiredAuction()) {
      this.fullDetails = this.auction.getExpiredAuction()
      this.messages = this.fullDetails.message
      this.auctions = this.fullDetails.auction
      this.bids = this.fullDetails.bid
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i] == 'Expired') {
          this.expiredmessages.push(this.messages[i])
        }
      }
      for (let i = 0; i < this.expiredmessages.length; i++) {
        this.expiredauctions.push(this.auctions[i])

      }
      for (let i = 0; i < this.expiredmessages.length; i++) {
        this.expiredbids.push(this.bids[i])
        this.auction.getBidInfo(this.expiredauctions[i]._id)
          .subscribe(data => {
            console.log(data)
            if (data['status'] == 200) {
              // this.winnerName.push(data['content'])
              this.winnerName[i] = data['content']
            }
            else {
              this.winnerName[i] = "No"
            }
          })
        // console.log(this.winnerName)
      }
      this.showWinners = true;
    }
    else {
      // console.log("No data")
      this.showWinners = false;
    }
  }

  getWinnerName(winnerID) {
    // console.log(winnerID)

    return "Shahrukh"
  }
}
