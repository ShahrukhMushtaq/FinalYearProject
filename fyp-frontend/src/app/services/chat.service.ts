import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('https://auctions-app.herokuapp.com/')
  // private socket = io('http://localhost:3000/')
  onlinerUsers;
  constructor() { }
  sendMessage(msg) {
    this.socket.emit('send message', msg)
  }

  receiveMessage() {
    let observable = new Observable<any>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data)
      });
      return () => { this.socket.disconnect(); }
    })
    return observable;
  }
  setUserName(username) {
    this.socket.emit('userName', username)
  }
  reveiveUsers() {
    let observable = new Observable<any>(observer => {
      this.socket.on('allUsers', (data) => {
        observer.next(data)
      });
      return () => { this.socket.disconnect(); }
    })
    return observable;
  }

  receiveOldMsg() {
    let observable = new Observable<any>(observer => {
      this.socket.on('old messages', (data) => {
        observer.next(data)
      });
      return () => { this.socket.disconnect(); }
    })
    return observable;
  }

  setOnlineUsers(data) {
    this.onlinerUsers = data;
  }
  getOnlineUsers() {
    return this.onlinerUsers;
  }

  setBids(data) {
    this.socket.emit('newBid', data)
  }
  reveiveBids() {
    let observable = new Observable<any>(observer => {
      this.socket.on('bids', (data) => {
        observer.next(data)
      });
      return () => { this.socket.disconnect(); }
    })
    return observable;
  }
  notifyAll() {
    let observable = new Observable<any>(observer => {
      this.socket.on('notify', (data) => {
        observer.next(data)
      });
      return () => { this.socket.disconnect(); }
    })
    return observable;
  }
}
