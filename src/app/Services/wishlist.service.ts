import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../Interfaces/iproduct';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  // add , delete , get (first , login)
  wishListProducsIds = new BehaviorSubject<string[]>([]) // 5 
  wishListCount = new BehaviorSubject<number>(0)
  constructor(private _HttpClient: HttpClient) {
      this.updateLoggedUserWishListAndCount()
    // mapping 
    
  }

  // add ===> array data ====> ids item wishlist 
  // delete ===> array data ===> ids items wishlist 
  // get ====> array data ===> object items wishlist 

  updateLoggedUserWishListAndCount()
  {
    this.getUserWishlist().subscribe({
      next: (response) => {
        console.log(response);
        this.wishListProducsIds.next((response.data as IProduct[]).map((product)=>product._id))
        this.wishListCount.next(response.data.length)
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId: productId,
      }
    );
  }

  getUserWishlist(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist'
    );
  }

  removeProductFromWishList(productId:string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
    );
  }
}
