import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _CartService: CartService,
    private _WishListService:WishlistService
  ) {}
  apiErrorMessage: string = '';
  isLoading: Boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z].{5,}$/),
    ]),
  });

  handleLogin(loginForm: FormGroup) {
    if (loginForm.valid) {
      this.isLoading = true;
      this._AuthService.login(loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          // get logged in user cart ===> num of cart items ==> notify navbar
          this._CartService.updateCartItemsCount();
          this._WishListService.updateLoggedUserWishListAndCount()
          this._Router.navigate(['/home']);
          this._AuthService.isLoggedInSubject.next(true);
          this._AuthService.isLoggedInVar = true;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.apiErrorMessage = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
