import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {passwordMatch } from 'src/app/Custom Validations/match-password';
import { AuthService } from 'src/app/Services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService , private _Router:Router) {}


// validators ===> null | {key:value}
// hoc ===> function minLength(num){return function}

  isLoading = false;
  apiErrorMessage:string='';
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z].{5,}$/),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z].{5,}$/),
      
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  }, {validators:passwordMatch});

  // next ===> navigation login 
  // error ===> display error
  
  handleRegister(regForm: FormGroup) {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.register(regForm.value).subscribe({
        next:(response)=>{
          console.log(response)
          this.isLoading=false;
          this._Router.navigate(['/login'])

        },
        error:(err)=>{
          this.isLoading = false;
          this.apiErrorMessage = err.error.message;
          console.log(this.apiErrorMessage)
        }
      })
    }
  }
}
