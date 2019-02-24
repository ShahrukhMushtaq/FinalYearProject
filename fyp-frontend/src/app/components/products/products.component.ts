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
    user: '',
    _id: ''
  }
  modalRef: BsModalRef;
  modalProduct = {};
  showModal = false;
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
        this.snotifyService.error(err.error.message, this.auth.getConfig())
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
    console.log(this.item)
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
                this.products = res['content']
              }, err => {
                this.snotifyService.error(err.error.message, this.auth.getConfig())
              })
            this.spinner.hide();
            this.snotifyService.success('Success', this.auth.getConfig())
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
    this.uploader.clearQueue();
    this.uplod = false
    this.item = _.cloneDeep({
      title: item.title,
      category: item.category,
      description: item.description,
      initialValue: item.initialValue,
      status: item.status,
      itemImage: item.itemImage,
      user: item.user,
      _id: item._id
    })
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

  modalData(item) {
    this.modalProduct = item;
    this.showModal = true;
  }

  removePic(i) {
    this.item.itemImage.splice(i, 1)
  }

  addFiles() {
    console.log(this.uploader)
  }

  removePicFromUploader(i) {
    this.uploader.queue.splice(i, 1)
  }
}
