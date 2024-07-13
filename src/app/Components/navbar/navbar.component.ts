import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // isLoggedUser ===> false
  // isLoggedIn ==> true 
  isLoggedUser:boolean = false;
  numOfCartItems:number = 0;
  wishListCount:number = 0;
  constructor(private _AuthService:AuthService , private _CartService:CartService , private _WLS:WishlistService){}
  logout()
  {
      this._AuthService.logOut()
  }

  // instance NavbarComponent  ===> one time 
  ngOnInit()
  {
    
    // act as observable
      this._AuthService.isLoggedInSubject.subscribe((isLogged)=>{this.isLoggedUser = isLogged})
      this._CartService.cartItemsNum.subscribe({
        next:(nums)=>{this.numOfCartItems = nums}
      })
      // observable 
      // obsever.
      // subject ===> observable , observer 
      this._WLS.wishListCount.subscribe((count)=>{this.wishListCount = count})
  }



}
