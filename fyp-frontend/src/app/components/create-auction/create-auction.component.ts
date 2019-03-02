import { Component, OnInit, TemplateRef } from '@angular/core';
import { CloudinaryService } from './../../services/cloudinary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { AuctionService } from '../../services/auction.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {

  products = [];
  selectedProduct;
  showAuction = false;
  modalRef: BsModalRef;
  modalImage: any;
  auctionForm: FormGroup;
  constructor(private cloud: CloudinaryService, private form: FormBuilder, private router: Router, private auth: AuthService, private snotifyService: SnotifyService, private auction: AuctionService, private spinner: NgxSpinnerService, private modalService: BsModalService) {
    this.auctionForm = this.form.group({
      'endDateTime': ['', Validators.required],
      'startingBid': ['', Validators.compose([Validators.min(1), Validators.required])],
      'user': [this.auth.CurrentUser._id, Validators.required],
      'item': ['']
    })
  }

  ngOnInit() {
    this.auction.getItem(this.auth.CurrentUser._id)
      .subscribe(res => {
        console.log(res)
        if (res['status'] == 200) {
          _.findIndex(res['content'], (item) => {
            if (item.status == 'true') {
              this.products.push(item)
            }
          })
        }
        else {
          this.snotifyService.warning(res['message'], this.auth.getConfig())
        }
      }, err => {
        console.log(err)
        this.snotifyService.error("Internet Problem", this.auth.getConfig())
      })
  }

  onSelect(newProduct) {
    this.selectedProduct = newProduct
    console.log(this.selectedProduct)
    if (this.selectedProduct) {
      this.showAuction = true;
    }
  }

  onSubmit() {
    this.auctionForm.value.endDateTime = this.auctionForm.value.endDateTime.getTime();
    this.auctionForm.value.item = this.selectedProduct._id;
    if (this.auctionForm.invalid) {
      this.snotifyService.warning("Invalid Details", this.auth.getConfig())
    }
    else {
      console.log(this.auctionForm.value)
      this.auction.createAuction(this.auctionForm.value)
        .subscribe(data => {
          if (data['status'] == 201) {
            this.showAuction = false;
            this.snotifyService.warning('Auction Already Exist', this.auth.getConfig())
            this.selectedProduct = [];
            this.products = [];
            this.ngOnInit()
          }
          else if (data['status'] == 200) {
            this.showAuction = false;
            this.snotifyService.success(data['message'], this.auth.getConfig())
            this.selectedProduct = [];
            this.products = [];
            this.ngOnInit()
          }
          else {
            this.showAuction = false;
            this.snotifyService.warning(data['message'], this.auth.getConfig())
            this.selectedProduct = [];
            this.products = [];
            this.ngOnInit()
          }
        }, err => {
          this.showAuction = false;
          this.snotifyService.error("Internet Problem", this.auth.getConfig())
          this.selectedProduct = [];
          this.products = [];
          this.ngOnInit()
        })
    }
  }
  openModal(template: TemplateRef<any>, i) {
    this.modalImage = i;
    this.modalRef = this.modalService.show(template)
  }

}
