import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  SERVER_URL = 'http://localhost:3000';
  wishlistCount = new BehaviorSubject(0);
  cartCount = new BehaviorSubject(0);
  constructor(private http: HttpClient) {
    this.getWishlistCount();
    this.getcartCount();
  }
  // get products
  getAllProductsAPI() {
    return this.http.get(`${this.SERVER_URL}/products/all`);
  }
  // register api
  registerAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/user/register`, user);
  }
  // login api
  loginAPI(user: any) {
    return this.http.post(`${this.SERVER_URL}/user/login`, user);
  }
  // product single
  getProductAPI(id: any) {
    return this.http.get(`${this.SERVER_URL}/product/get/${id}`);
  }

  appendTokenToHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }
  
  addToWishlistAPI(product: any) {
    return this.http.post(
      `${this.SERVER_URL}/wishlist/add/`,
      product,
      this.appendTokenToHeader()
    );
  }
  // get wishlist all products
  getWishlistAPI() {
    return this.http.get(
      `${this.SERVER_URL}/wishlist/get-allProducts`,
      this.appendTokenToHeader()
    );
  }

  getWishlistCount() {
    this.getWishlistAPI().subscribe((res: any) => {
      this.wishlistCount.next(res.length);
    });
  }

  // remove wishlist
  deleteWishlistItem(id: any) {
    return this.http.delete(
      `${this.SERVER_URL}/wishlist/remove/${id}`,
      this.appendTokenToHeader()
    );
  }
  // add ro cart
  addtocartAPI(product: any) {
    return this.http.post(
      `${this.SERVER_URL}/cart/add`,
      product,
      this.appendTokenToHeader()
    );
  }
  getcartCount() {
    this.getCartAPI().subscribe((res: any) => {
      console.log(res);
      this.cartCount.next(res.length);
    });
  }
  // get cart
  getCartAPI() {
    return this.http.get(
      `${this.SERVER_URL}/cart/get-all-products`,
      this.appendTokenToHeader()
    );
  }
  // cart increment
  cartIncrementAPI(id: any) {
    return this.http.get(
      `${this.SERVER_URL}/cart/increment/${id}`,
      this.appendTokenToHeader()
    );
  }
  // cart decrement
  cartDecrementAPI(id: any) {
    return this.http.get(
      `${this.SERVER_URL}/cart/decrement/${id}`,
      this.appendTokenToHeader()
    );
  }
  // remove item from cart
  removeCartItemAPI(id: any) {
    return this.http.delete(
      `${this.SERVER_URL}/cart/remove/${id}`,
      this.appendTokenToHeader()
    );
  }
  // empty cart
  emptyCartAPI() {
    return this.http.delete(
      `${this.SERVER_URL}/cart/empty`,
      this.appendTokenToHeader()
    );
  }
}
