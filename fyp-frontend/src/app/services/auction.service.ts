import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  storeData;
  expiredAuctionData;
  constructor(private http: HttpClient) { }

  addItem(data) {
    return this.http.post('https://auctions-app.herokuapp.com/api/add/item', data)
    // return this.http.post('http://localhost:3000/api/add/item', data)
  }

  getItem(id) {
    return this.http.get(`https://auctions-app.herokuapp.com/api/get/item/${id}`)
    // return this.http.get(`http://localhost:3000/api/get/item/${id}`)
  }

  getAllItem() {
    return this.http.get('https://auctions-app.herokuapp.com/api/getAll/item')
    // return this.http.get('http://localhost:3000/api/getAll/item')
  }

  updateItem(data) {
    return this.http.put(`https://auctions-app.herokuapp.com/api/update/item/${data._id}`, data)
    // return this.http.put(`http://localhost:3000/api/update/item/${data._id}`, data)
  }

  createAuction(data) {
    // return this.http.post('http://localhost:3000/api/create/auction', data)
    return this.http.post('https://auctions-app.herokuapp.com/api/create/auction', data)
  }

  getAuction(id) {
    // return this.http.get(`http://localhost:3000/api/get/auction/${id}`)
    return this.http.get(`https://auctions-app.herokuapp.com/api/get/auction/${id}`)
  }

  getAllAuction() {
    // return this.http.get('http://localhost:3000/api/get/auction')
    return this.http.get('https://auctions-app.herokuapp.com/api/get/auction')
  }

  createBid(data) {
    // return this.http.post('http://localhost:3000/api/create/bid', data)
    return this.http.post('https://auctions-app.herokuapp.com/api/create/bid', data)
  }
  getBid(id) {
    return this.http.get(`https://auctions-app.herokuapp.com/api/get/bid/${id}`)
    // return this.http.get(`http://localhost:3000/api/get/bid/${id}`)
  }
  getBidInfo(id) {
    return this.http.get(`https://auctions-app.herokuapp.com/api/get/bidinfo/${id}`)
    // return this.http.get(`http://localhost:3000/api/get/bidinfo/${id}`)
  }
  setProductData(data) {
    this.storeData = data
  }
  getProductData() {
    return this.storeData;
  }
  setExpiredAuction(data) {
    return this.expiredAuctionData = data;
  }
  getExpiredAuction() {
    return this.expiredAuctionData;
  }
}
