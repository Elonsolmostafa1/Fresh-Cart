import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {
    // observer observable 
    this.updateCartItemsCount()
      
  }
  // singleton instance
  // interceptor (req , response)

  cartItemsNum = new BehaviorSubject<number>(0)

  // isAdded = true
  // if isAdded ===> true ===> toggle ===> false 
  /*
  isAdded= true;
  handleWishlistRequest()
  {
      if(isAdded)
      {
        // Add
        // isAdded = false;
      }
      else 
      {
          // remove 
          // isAdded = true;
      }

  }


  */
  updateCartItemsCount()
  {
    this.getUserCart().subscribe({
      next:(response)=>{this.cartItemsNum.next(response.numOfCartItems)  },
      error:(err)=>{
        // make sure ===> 404 
        if(err.status == 404)
        {
          // notify navbar ===> numOfCartItems ===> 0
          this.cartItemsNum.next(0)

        }
        
      }
    })
  }

  addCartItem(id: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: id,
      }
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  removeCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    );
  }

  updateCartItem(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: count }
    );
  }

  onlinePayment(cartId: any, shippingAddress: any): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {shippingAddress:shippingAddress}
    );
  }
}
