import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from './../../services/cloudinary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { Router } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  uploader;
  constructor(private cloud: CloudinaryService, private form: FormBuilder) {
    this.uploader = cloud.getConnected();
    this.productForm = this.form.group({
      'title': ['', Validators.required],
      'category': ['', Validators.required],
      'description': ['', Validators.required],
      'initialValue': [0, Validators.required],
      'status': ['', Validators.required],
      'itemImage': this.form.array(['', Validators.required])
    })
  }

  ngOnInit() {
  }

  upload() {
    console.log(this.uploader)
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res);
      // this.productForm.value.itemImage.push(res.secure_url);
      return { item, response, status, headers };
    };
  }

  onSubmit() {
    console.log(this.productForm.value)
    console.log(this.productForm.valid)
  }

}
