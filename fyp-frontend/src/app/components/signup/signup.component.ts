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
      'avatar': ['', Validators.required],
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
    console.log(this.uploader)
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res);
      this.registrationForm.value.avatar = res.secure_url;
      return { item, response, status, headers };
    };
  }

  signup() {
    console.log(this.registrationForm.value)
    this.auth.registerUser(this.registrationForm.value)
      .subscribe(res => {
        if (res['status'] == 200) {
          this.snotifyService.success(res['messsage'], this.auth.getConfig())
          this.router.navigate(['user'])
        } else {
          this.snotifyService.warning(res['messsage'], this.auth.getConfig())
        }
      }, err => {
        this.snotifyService.error(err.error.message, this.auth.getConfig())
      }
  }

}