import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  isLoading = false;
  allWishListProducts: IProduct[] = [];
  constructor(
    private _WishListService: WishlistService,
    private _CartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getWishListData()
  }

  getWishListData() {
    this._WishListService.getUserWishlist().subscribe({
      next: (response) => {
        console.log(response);
        this.allWishListProducts = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  addToCart(id: string) {
    this._CartService.addCartItem(id).subscribe({
      next: (response) => {
        console.log(response);
        this._CartService.cartItemsNum.next(response.numOfCartItems);
        this.toastr.success('Successfully added to cart!', 'Product Added!', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItemFromWishList(id: string) {
    this.isLoading = true;
    this._WishListService.removeProductFromWishList(id).subscribe({
      next: (response) => {
        console.log(response);
        this._WishListService.wishListProducsIds.next(response.data);
        this._WishListService.wishListCount.next(response.data.length)
        this.toastr.info("Product deleted successfully from wishlist")
        this.getWishListData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}


/*
wishList service ====> array of wishlist products ids ====> behavior subject 


home ==> onInit ===> get all products ===> display ===> compare id ===> wlProducsIds 
products ===> 


add product to wishlist ====> update 



*/