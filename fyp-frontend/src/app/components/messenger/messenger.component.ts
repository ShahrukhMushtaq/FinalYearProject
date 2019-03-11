import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../services/chat.service";
import { AuthService } from "../../services/auth.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  errors;
  flag = false;
  onlineUsers = [];
  constructor(private chat: ChatService, private auth: AuthService) {
    this.chat.setUserName(auth.CurrentUser._id)
  }

  ngOnInit() {
    this.chat.reveiveUsers()
      .subscribe(data => {
        console.log(data)
        if (data == true) {
          this.errors = "UserName Already Exist"
          this.flag = true;
        }
        else {
          // for (let i = 0; i < data.length; i++) {
          //   if (data[i] == this.username) {
          //     data.splice(i, 1)
          //   } else {
          //     this.onlineUsers.push(data[i])
          //   }
          // }
          this.onlineUsers = data;
          this.flag = false;
        }
      })
  }

}
