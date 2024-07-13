import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent  implements OnInit{

  shippingAddressForm:FormGroup = new FormGroup({
    details: new FormControl(null , Validators.required),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null , Validators.required)
  })

  cartId:string|null = ""

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{this.cartId = params.get("id")})

  }

  constructor(private _CartService:CartService , private _ActivatedRoute:ActivatedRoute){}

  redirectToPaymentPage(url:string)
  {
      window.location.href = url;
  }

  handleShippingAddress(form:FormGroup)
  {
      this._CartService.onlinePayment(this.cartId , form.value).subscribe({
        next:(response)=>{console.log(response)
            this.redirectToPaymentPage(response.session.url)
        },
        error:(err)=>{console.log(err)}
      })
  }

}
