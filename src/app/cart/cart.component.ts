import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  cartTotal: number = 0;
  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.getCart();
    } else {
      this.cartItems = [];
    }
  }
  constructor(private api: ApiService,private router:Router) {}
  getCart() {
    this.api.getCartAPI().subscribe((res: any) => {
      this.cartItems = res;
      console.log(res);
      this.getCartTotalPrice();
    });
  }
  getCartTotalPrice() {
    if (this.cartItems.length > 0) {
      let total = 0;
      this.cartItems.forEach((product: any) => {
        total += product.grandTotal;
        this.cartTotal = Math.ceil(total);
      });
      // total = this.cartItems
      //   .map((item: any) => item.grandTotal)
      //   .reduce((amt1: any, amt2: any) => amt1 + amt2);
      // this.cartTotal = Math.ceil(total);
    } else {
      this.cartTotal = 0;
    }
  }

  incrementCart(id: any) {
    this.api.cartIncrementAPI(id).subscribe({
      next: (res: any) => {
        this.getCart();
        this.api.getcartCount();
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  decrementCart(id: any) {
    this.api.cartDecrementAPI(id).subscribe({
      next: (res: any) => {
        this.getCart();
        this.api.getcartCount();
      },
      error: (err: any) => {
        console.log(err.error);
      },
    });
  }

  // remove item
  removeItem(id: any) {
    this.api.removeCartItemAPI(id).subscribe((res: any) => {
      this.getCart();
      this.api.getcartCount();
    });
  }

  emptyCart(){
    this.api.emptyCartAPI().subscribe((res:any)=>{
      this.getCart()
      this.api.getcartCount()
    })
  }

  checkOut(){
    sessionStorage.setItem("total",JSON.stringify(this.cartTotal))
this.router.navigateByUrl("/user/checkout")
  }
}
