import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CloudinaryService } from './../../services/cloudinary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registrationForm: FormGroup;
  uploader;
  uplod = false;
  imageURL;
  constructor(private router: Router, private auth: AuthService, private cloud: CloudinaryService, private form: FormBuilder, private snotifyService: SnotifyService) {
    this.uploader = cloud.getConnected();
    this.registrationForm = form.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'age': ['', Validators.compose([Validators.required, Validators.min(18)])],
      'location': ['', Validators.required],
      'phone': ['', Validators.compose([Validators.required, Validators.min(1000000000)])],
      'avatar': [''],
      'gender': ['', Validators.required],
      'about': ['Bio']
    })
  }

  public get email() {
    return this.registrationForm.get('email')
  }
  public get password() {
    return this.registrationForm.get('password')
  }
  public get age() {
    return this.registrationForm.get('age')
  }
  public get phone() {
    return this.registrationForm.get('phone')
  }


  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['user']);
    }
  }
  upload() {
    // console.log(this.uploader)
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      // console.log(res);
      this.imageURL = res.secure_url;
      this.uplod = true
      return { item, response, status, headers };
    };
  }

  signup() {
    this.registrationForm.value.avatar = this.imageURL;
    // console.log(this.registrationForm.value)
    if (this.registrationForm.invalid) {
      this.snotifyService.warning("Invalid Details", this.auth.getConfig())
    }
    else {
      this.auth.registerUser(this.registrationForm.value)
        .subscribe(res => {
          if (res['status'] == 200) {
            this.snotifyService.success("Successfully Registered", this.auth.getConfig())
            localStorage.setItem('username', res['content'].email)
            this.router.navigate(['user'])
          } else {
            this.snotifyService.warning(res['messsage'], this.auth.getConfig())
          }
        }, err => {
          this.snotifyService.error(err.error.message, this.auth.getConfig())
        })
    }
  }
}