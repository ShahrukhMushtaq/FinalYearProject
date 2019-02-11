import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  addItem(data) {
    return this.http.post('https://auctions-app.herokuapp.com/api/add/item', data)
    // return this.http.post('http://localhost:3000/api/add/item', data)
  }

  getItem(id) {
    return this.http.get(`https://auctions-app.herokuapp.com/api/get/item/${id}`)
    // return this.http.get(`http://localhost:3000/api/get/item/${id}`)
  }

  updateItem(data) {
    return this.http.put(`https://auctions-app.herokuapp.com/api/update/item/${data._id}`, data)
    // return this.http.put(`http://localhost:3000/api/update/item/${data._id}`, data)
  }
}