import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuctionService } from '../../services/auction.service';
import { SnotifyService } from 'ng-snotify';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
  bidValue;
  modalRef: BsModalRef
  currentAuctionId;
  btnFlag = true;
  minBid = 0;
  minBidDB = [];
  index;
  constructor(private auction: AuctionService, private snotifyService: SnotifyService, private auth: AuthService, private modalService: BsModalService) { }

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
          this.start();
          this.Auctions.map((auction, i) => {
            this.auction.getBid(auction._id)
              .subscribe(data => {
                if (data['status'] == 200) {
                  this.minBidDB[i] = data['content'].bidValue;
                }
                else {
                  this.minBidDB[i] = 0;
                }
              }, err => {
                this.minBidDB[i] = 0;
                console.log(err)
              })
          })
          this.showAuctions = true;
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
        auction.endDateTime -= 1;
        if (auction.endDateTime === 0) {
          this.message[i] = 'Expired';
        } else {
          let seconds = auction.endDateTime - Date.now();
          let date = Math.floor(seconds / (1000 * 60 * 60 * 24));
          let hour = Math.floor((seconds / (1000 * 60 * 60)) % 24)
          let min = Math.floor((seconds / 1000 / 60) % 60)
          let sec = Math.floor((seconds / 1000) % 60)
          if (seconds < 0) { this.message[i] = 'Expired'; }
          else this.message[i] = `${date} Days ${hour} Hours ${min} Minutes ${sec} Seconds`;
        }
      }, 1000);
    })
  }

  placeBid(template: TemplateRef<any>) {
    let bidObj = {
      bidValue: this.bidValue,
      user: this.auth.CurrentUser._id,
      auction: this.currentAuctionId,
      bidInfo: [{
        user: this.auth.CurrentUser._id,
        bidValue: this.bidValue
      }]
    }
    console.log(bidObj)
    this.auction.createBid(bidObj)
      .subscribe(data => {
        if (data['status'] == 200) {
          this.minBid = data['content'].bidValue;
          this.minBidDB[this.index] = data['content'].bidValue;
          this.modalRef.hide();
          this.modalRef = this.modalService.show(template)
          this.btnFlag = true
        }
        else {
          this.btnFlag = true
          this.modalRef.hide()
          this.snotifyService.warning(data['message'], this.auth.getConfig())
        }
      }, err => {
        console.log(err)
        this.btnFlag = true
        this.snotifyService.error("Error Kab Khatam hongy", this.auth.getConfig())
      })
  }

  showStaticModal(template: TemplateRef<any>, auctionID, startingBid, index) {
    this.currentAuctionId = auctionID
    this.minBid = this.minBidDB[index] == 0 ? startingBid : this.minBidDB[index];
    // this.minBid = minBid
    this.bidValue = ''
    this.modalRef = this.modalService.show(template)
    this.index = index;
  }

  checkBidVal(minbid, bidVal) {
    if (bidVal <= minbid) this.btnFlag = true
    else this.btnFlag = false
  }

}