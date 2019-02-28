import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CloudinaryService } from './../../services/cloudinary.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  modalRef: BsModalRef;
  uploader;
  checkedMale;
  checkedFemale;
  userData = {
    firstName: '',
    lastName: '',
    avatar: '',
    age: 0,
    phone: 0,
    location: '',
    email: '',
    gender: '',
    about: '',
  }
  constructor(private auth: AuthService, private snotifyService: SnotifyService, private spinner: NgxSpinnerService, private modalService: BsModalService, private cloud: CloudinaryService) {
    this.uploader = cloud.getConnected();
  }

  ngOnInit() {
    this.spinner.show();
    this.auth.getUserProfile()
      .subscribe(res => {
        if (res['status'] == 200) {
          // console.log(res)
          this.userData = res['content']
          if (this.userData.gender == 'Male') {
            this.checkedMale = true;
            this.checkedFemale = false;
          } else {
            this.checkedMale = false;
            this.checkedFemale = true;
          }
          this.spinner.hide();
          // this.snotifyService.success(res['message'], this.auth.getConfig())
        } else {
          this.spinner.hide();
          this.snotifyService.warning(res['message'], this.auth.getConfig())
        }
      }, err => {
        this.spinner.hide();
        this.snotifyService.warning(err.error.message, this.auth.getConfig())
      })
    // console.log(this.auth.CurrentUser)
  }

  getPicture() {
    return this.userData.avatar !== '' ? this.userData.avatar : 'https://res.cloudinary.com/shahrukhmushtaq/image/upload/v1548766363/auction-users/boy.png';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }))
  }

  updateProfile() {
    console.log(this.userData)
    this.spinner.show();
    this.auth.updateUserProfile(this.userData)
      .subscribe(res => {
        this.userData = res['content']
        this.spinner.hide();
        this.snotifyService.success(res['message'], this.auth.getConfig())
        this.modalRef.hide();
      }, err => {
        this.spinner.hide();
        this.snotifyService.error(err.error.message, this.auth.getConfig())
      })
  }

  upload() {
    console.log(this.uploader.queue)
    this.uploader.queue[0].upload();
    this.uploader.queue[0].onSuccess = (response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res);
      this.userData.avatar = res.secure_url;
      return { response, status, headers };
    };
  }
}