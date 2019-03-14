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
  flag = true;
  onlineUsers = [];
  userFlag = false;
  username = localStorage.getItem('username');
  msg;
  displayMsg = [];
  constructor(private chat: ChatService, private auth: AuthService) {
  }

  async ngOnInit() {
    await this.chat.setUserName(this.username)
    this.chat.reveiveUsers()
      .subscribe(async (data) => {
        // console.log("Users", data)
        if (data == true) {
          this.onlineUsers = this.chat.getOnlineUsers();
          this.flag = false;
          // console.log(this.onlineUsers)
        }
        else {
          this.onlineUsers = data;
          this.chat.setOnlineUsers(data);
          this.flag = false;
        }
      })
    this.chat.receiveMessage().subscribe((msg) => {
      this.displayMsg.push(msg)
      // console.log("Messages", msg)
    })
    this.chat.receiveOldMsg()
      .subscribe(data => {
        this.displayMsg = data.map(doc => doc)
      })
  }

  sendMsg() {
    this.chat.sendMessage(this.msg)
    this.msg = ''
  }

}
