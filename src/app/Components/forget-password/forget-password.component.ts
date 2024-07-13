import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  apiErrorMessage:string = '';
  isLoading:boolean = false;
  forgetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email])
  })



  handleForgetPassword(form:FormGroup)
  {
      this.isLoading = true;
      this._AuthService.forgetPassword(form.value).subscribe({
        next:(response)=>{console.log(response)
          this._Router.navigate(["/verify-reset-code"])
          this.isLoading = false;
          },
          error:(err)=>{console.log(err)
            this.apiErrorMessage = err.error.message
            this.isLoading = false;
        }
      })
  }

}
