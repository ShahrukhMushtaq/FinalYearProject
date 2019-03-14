import { Component, OnInit } from '@angular/core';
import { AuctionService } from './../../services/auction.service';

@Component({
  selector: 'app-public-products',
  templateUrl: './public-products.component.html',
  styleUrls: ['./public-products.component.css']
})
export class PublicProductsComponent implements OnInit {
  product;
  showDetails = false;
  constructor(private auction: AuctionService) { }

  ngOnInit() {
    // console.log(this.auction.getProductData())
    this.product = this.auction.getProductData()
    if (this.product) {
      this.showDetails = true;
    }
  }

}
