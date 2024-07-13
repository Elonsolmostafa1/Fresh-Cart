import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  isLoggedInSubject = new BehaviorSubject<boolean>(localStorage.getItem("token")?true:false);
  isLoggedInVar = localStorage.getItem('token')? true:false;

  constructor(private _HttpClient:HttpClient , private _Router:Router) { }

  register(regForm:object):Observable<any>
  {
      return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup" ,regForm )
  }

  login(loginForm:object):Observable<any>
  {
      return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin" ,loginForm )
  }

  logOut()
  {
      // remove token from local storage
      localStorage.removeItem("token")

      // navigate to login page
      this._Router.navigate(['/login'])

      this.isLoggedInSubject.next(false);
      this.isLoggedInVar = false;

  }

  forgetPassword(forgetPasswordForm:any):Observable<any>
  {
      return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",forgetPasswordForm)
  }

  verifyResetCode(form:any):Observable<any>
  {
      return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",form)
  }

  resetPassword(form:any):Observable<any>
  {
      return this._HttpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",form)
  }
}

// variable boolean ===> loggedIn

// 1- logout ===> logOut method 
// 2- login ===> handleLogin 
// 3- navbar ===> value

/*
1- observable and observer 
observable ===> subscribe from navbar 
subscriber ====> notify outside 


hot vs cold 

hot ====> 

Subject

1- notify change isLoggedIn
2- start value ===> notify 
true false true false ....
3- late subscriber ===> last state

BehaviorSubject


first ===> notify start value 
late sub ===> last value 

true ===> true 
false ===> sub ===> false 

*/