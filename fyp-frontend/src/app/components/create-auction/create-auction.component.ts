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
  constructor(private cloud: CloudinaryService, private form: FormBuilder, private router: Router, private auth: AuthService, private snotifyService: SnotifyService, private auction: AuctionService, private spinner: NgxSpinnerService, private modalService: BsModalService) { }

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
        this.snotifyService.error(err.error.message, this.auth.getConfig())
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
    console.log("Called")
  }
  openModal(template: TemplateRef<any>, i) {
    this.modalImage = i;
    this.modalRef = this.modalService.show(template)
  }

}
