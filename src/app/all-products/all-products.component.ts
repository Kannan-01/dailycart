import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  allProducts: any = [];
  constructor(private api: ApiService, private toaster: ToasterService) {}
  ngOnInit(): void {
    this.api.getAllProductsAPI().subscribe((res) => {
      this.allProducts = res;
    });
  }
  addToWishlist(product: any) {
    if (sessionStorage.getItem('token')) {
      this.api.addToWishlistAPI(product.id).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess(`product added to wishlist !`);
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
      this.toaster.showSuccess('proceed');
    } else {
      this.toaster.showWarning('Login Please !!!');
    }
  }
}
