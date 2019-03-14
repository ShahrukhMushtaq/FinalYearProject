import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from './../../services/cloudinary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { AuctionService } from '../../services/auction.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  uploader;
  uplod: boolean = false;
  constructor(private cloud: CloudinaryService, private form: FormBuilder, private router: Router, private auth: AuthService, private snotifyService: SnotifyService, private auction: AuctionService, private spinner: NgxSpinnerService) {
    this.uploader = cloud.getConnected();
    this.productForm = this.form.group({
      'title': ['', Validators.required],
      'category': ['', Validators.required],
      'description': ['', Validators.required],
      'initialValue': ['', Validators.compose([Validators.min(1), Validators.required])],
      'status': ["", Validators.required],
      'itemImage': [[]],
      'user': [this.auth.CurrentUser._id, Validators.required]
    })
  }
  ngOnInit() {
  }

  upload() {
    // console.log(this.uploader)
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      // console.log(res);
      // this.productForm.value.itemImage = [];
      this.productForm.value.itemImage.push(res.secure_url);
      this.uplod = true
      return { item, response, status, headers };
    };
  }

  onSubmit() {
    this.spinner.show();
    if (this.productForm.invalid) {
      // console.log(this.productForm.value)
      this.spinner.hide();
      this.snotifyService.warning("Invalid Details", this.auth.getConfig())
    }
    else {
      if (this.uplod) {
        this.auction.addItem(this.productForm.value)
          .subscribe(res => {
            if (res['status'] == 200) {
              this.productForm.setValue({
                title: '',
                description: '',
                category: '',
                status: 'false',
                initialValue: '',
                itemImage: [''],
                user: this.auth.CurrentUser._id
              })
              this.spinner.hide();
              this.router.navigate(['user/items'])
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
  }

  selectFiles() {
    // console.log(this.uploader)
  }
}
