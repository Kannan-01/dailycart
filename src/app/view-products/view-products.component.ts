import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent implements OnInit {
  product: any = {};
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      // console.log(res);
      const { id } = res;
      // get details of particular product
      this.getProductDetails(id)
    });
  }

  getProductDetails(id:any) {
    this.api.getProductAPI(id).subscribe({
      next: (res: any) => {
        this.product = res;
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  addToWishlist(product: any) {
    if (sessionStorage.getItem('token')) {
      alert('proceed');
    } else {
      alert('please login');
    }
  }
  addTocart(product: any) {
    if (sessionStorage.getItem('token')) {
      alert('proceed');
    } else {
      alert('please login');
    }
  }
}
