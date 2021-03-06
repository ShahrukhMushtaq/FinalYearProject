import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { AuctionService } from "../../services/auction.service";
import { AuthService } from "../../services/auth.service";
import { ChatService } from "../../services/chat.service";
import { SnotifyService } from 'ng-snotify';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  searchAuction = {
    title: '',
    category: '',
    date: '',
    minbid: '',
    maxbid: ''
  }
  Auctions = [];
  Products = [];
  intervalId = 0;
  message = [];
  showAuctions = false;
  showProducts = false;
  showQuickLook = false;
  quickProduct: any;
  bidValue;
  modalRef: BsModalRef
  currentAuctionId;
  btnFlag = true;
  minBid = 0;
  minBidDB = [];
  index;
  expiredAuctionData = [];
  realBid = 0;
  showSearchedAuctions = false;
  searchedAuctions = [];
  constructor(private auction: AuctionService, private auth: AuthService, private snotifyService: SnotifyService, private modalService: BsModalService, private router: Router, private chat: ChatService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.auction.getAllAuction()
      .subscribe(res => {
        if (res['status'] == 200) {
          this.Auctions = res['content']
          this.start();
          this.Auctions.map((auction, i) => {
            this.auction.getBid(auction._id)
              .subscribe(data => {
                if (data['status'] == 200) {
                  this.minBidDB[i] = data['content'].bidValue;
                  // console.log(this.minBidDB);
                  this.spinner.hide();
                }
                else {
                  this.minBidDB[i] = 0;
                }
              }, err => {
                this.minBidDB[i] = 0;
                // console.log(err)
              })
          })
          this.showAuctions = true;
        } else {
          this.snotifyService.warning(res['message'], this.auth.getConfig())
        }
      }, err => {
        // console.log(err)
        this.snotifyService.error("Internet Problem", this.auth.getConfig())
      })
    this.auction.getAllItem()
      .subscribe(data => {
        if (data['status'] == 200) {
          this.Products = data['content']
          this.showProducts = true;
          // console.log(this.Products)
        }
      }, err => {
        // console.log(err)
      })
    this.chat.reveiveBids().subscribe(data1 => {
      this.realBid = data1.bidValue;
      this.minBidDB[data1.index] = data1.bidValue;
      this.minBid = data1.bidValue;
    })
    this.chat.notifyAll().subscribe(data => {
      if (data) {
        this.snotifyService.info(`${data.user} made a bid of Rs.${data.bidValue}`, this.auth.getConfig())
      }
    })
  }

  searchAuctions() {
    this.searchedAuctions = [];
    this.Auctions.map(auction => {
      if (auction.item.title == this.searchAuction.title || auction.item.category == this.searchAuction.category) {
        this.searchedAuctions.push(auction)
        this.showSearchedAuctions = true;
      }
    })
  }

  clearTimer() { clearInterval(this.intervalId); }

  ngOnDestroy() { this.clearTimer(); this.auction.setExpiredAuction({ message: this.message, auction: this.Auctions, bid: this.minBidDB }) }

  start() { this.countDown(); }

  private countDown() {
    this.clearTimer();
    this.Auctions.map((auction, i) => {
      this.intervalId = window.setInterval(() => {
        auction.endDateTime -= 1;
        if (auction.endDateTime === 0) {
          this.message[i] = 'Expired';
          this.expiredAuctionData[i] = true;
        } else {
          let seconds = auction.endDateTime - Date.now();
          let date = Math.floor(seconds / (1000 * 60 * 60 * 24));
          let hour = Math.floor((seconds / (1000 * 60 * 60)) % 24)
          let min = Math.floor((seconds / 1000 / 60) % 60)
          let sec = Math.floor((seconds / 1000) % 60)
          if (seconds < 0) { this.message[i] = 'Expired'; this.expiredAuctionData[i] = true; }
          else {
            this.message[i] = `${date} Days ${hour} Hours ${min} Minutes ${sec} Seconds`; this.expiredAuctionData[i] = false;
          }
        }
      }, 1000);
    })
  }

  decideWinner() {
    console.log(this.message)
    console.log(this.minBidDB)
  }

  modalData(item, i) {
    this.quickProduct = item;
    this.quickProduct.index = i;
    this.showQuickLook = true;
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
    this.chat.setBids({ bidValue: this.bidValue, index: this.index, username: localStorage.getItem("username") })
    // console.log(bidObj)
    this.auction.createBid(bidObj)
      .subscribe(data => {
        if (data['status'] == 200) {
          this.minBid = this.realBid;
          this.minBidDB[this.index] = this.realBid;
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
        // console.log(err)
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
    this.index = index
  }

  checkBidVal(minbid, bidVal) {
    if (bidVal <= minbid) this.btnFlag = true
    else this.btnFlag = false
  }

  viewProductComp(product) {
    this.auction.setProductData(product)
    this.router.navigate(['public-product'])
  }
}