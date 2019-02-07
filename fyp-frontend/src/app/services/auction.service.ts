import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  addItem(data) {
    return this.http.post('http://localhost:3000/api/add/item', data)
  }

  getItem(id) {
    return this.http.get(`http://localhost:3000/api/get/item/${id}`)
  }

  updateItem(data) {
    return this.http.put(`http://localhost:3000/api/update/item/${data.id}`, data)
  }
}
