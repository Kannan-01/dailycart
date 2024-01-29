import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent implements OnInit {
  product: any = {};
  constructor(private route: ActivatedRoute, private api: ApiService,private toaster:ToasterService) {}
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      // console.log(res);
      const { id } = res;
      // get details of particular product
      this.getProductDetails(id)
      console.log(this.product);
      
    });
  }

  getProductDetails(id:any) {
    this.api.getProductAPI(id).subscribe({
      next: (res: any) => {
        this.product = res;
        console.log(res);
        
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  addToWishlist(product: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlistAPI(product).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess(` ${res.title} product added to wishlist !`);
          this.api.getWishlistCount()
        },
        error: (err: any) => {
          this.toaster.showWarning(err.error);
        },
      });
    } else {
      this.toaster.showWarning('Login Please !!!');
    }
  }
  addTocart(product: any) {
    if (sessionStorage.getItem('token')) {
      Object.assign(product, { quantity: 1 });
      this.api.addtocartAPI(product).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess(res);
          this.api.getcartCount()
        },
        error: (err: any) => {
          console.log(err);
          this.toaster.showError(err.error);
        },
      });
    } else {
      this.toaster.showWarning('Login Please !!!');
    }
  }
}
