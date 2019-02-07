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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  uploader;
  products = [];
  checkNow = false;
  checkLater = false;
  uplod = false;
  item = {
    title: '',
    category: '',
    description: '',
    initialValue: '',
    status: '',
    itemImage: [],
    user: ''
  }
  modalRef: BsModalRef;
  constructor(private cloud: CloudinaryService, private form: FormBuilder, private router: Router, private auth: AuthService, private snotifyService: SnotifyService, private auction: AuctionService, private spinner: NgxSpinnerService, private modalService: BsModalService) {
    this.uploader = cloud.getConnected();
    this.productForm = this.form.group({
      'title': ['', Validators.required],
      'category': ['', Validators.required],
      'description': ['', Validators.required],
      'initialValue': ['', Validators.required],
      'status': ["false", Validators.required],
      'itemImage': [[''], Validators.required],
      'user': [this.auth.CurrentUser._id, Validators.required]
    })
  }

  ngOnInit() {
    this.auction.getItem(this.auth.CurrentUser._id)
      .subscribe(res => {
        console.log(res)
        this.products = res['content']
      }, err => {
        console.log(err)
      })
  }

  upload() {
    console.log(this.uploader)
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res);
      this.item.itemImage.push(res.secure_url);
      this.uplod = true
      return { item, response, status, headers };
    };
  }

  updateProduct() {
    this.spinner.show();
    if (!this.item) {
      this.spinner.hide();
      this.snotifyService.warning("Invalid Details", this.auth.getConfig())
    }
    else {
      this.auction.updateItem(this.item)
        .subscribe(res => {
          if (res['status'] == 200) {

            this.modalRef.hide()
            this.auction.getItem(this.auth.CurrentUser._id)
              .subscribe(res => {
                console.log(res)
                this.products = res['content']
              }, err => {
                console.log(err)
              })
            this.spinner.hide();
            this.snotifyService.success(res['messsage'], this.auth.getConfig())
          } else {
            this.spinner.hide();
            this.snotifyService.warning(res['messsage'], this.auth.getConfig())
          }
        }, err => {
          this.spinner.hide();
          this.snotifyService.error(err.error.message, this.auth.getConfig())
        })
    }
  }

  openModal(template: TemplateRef<any>, item) {
    this.item = {
      title: item.title,
      category: item.category,
      description: item.description,
      initialValue: item.initialValue,
      status: item.status,
      itemImage: item.itemImage,
      user: item.user
    }
    if (item.status == 'true') {
      this.checkNow = true;
      this.checkLater = false;
    }
    if (item.status == 'false') {
      this.checkLater = true;
      this.checkNow = false;
    }
    this.modalRef = this.modalService.show(template)
  }

}
