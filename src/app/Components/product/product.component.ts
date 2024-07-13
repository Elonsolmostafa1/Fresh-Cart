import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product!: IProduct;

  wishListProductsIdsList : string[] = []

  constructor(
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishListService:WishlistService
  ) {}

  ngOnInit(): void {
      this._WishListService.wishListProducsIds.subscribe((idsList)=>{this.wishListProductsIdsList = idsList})
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

  addToWishList(productId: string) {
    this._WishListService.addProductToWishlist(productId).subscribe({
      next:(response)=>{console.log(response)
        this.toastr.success(response.message,"Product Added!")
        this._WishListService.wishListProducsIds.next(response.data);
        this._WishListService.wishListCount.next(response.data.length)
      },
      error:(err)=>{console.log(err)}
    })
  }

  isWishListProduct(id:string)
  {
      // array of ids of wishlist products 
      // id of current product 
      return this.wishListProductsIdsList.includes(id) // true false
  }
}
