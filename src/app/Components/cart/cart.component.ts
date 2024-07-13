import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  isLoading = true;

  cartDetails:any;
  constructor(private _CartService:CartService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.isLoading = true;
    this._CartService.getUserCart().subscribe({
      next:(response)=>{this.cartDetails = response.data;
        console.log(response);
        this.isLoading = false
      },
      error:(err)=>{console.log(err)
        this.isLoading = false;
      }
    })
  }


    removeCartItem(id:string)
    {
      
      this._CartService.removeCartItem(id).subscribe({
        next:(response)=>{this.cartDetails = response.data
          //this.cartItemsNum.next(response.numOfCartItems)
          this._CartService.cartItemsNum.next(response.numOfCartItems)
        },
        error:(err)=>{console.log(err)}
      })
    }

    updateCartItem(id:string,count:number)
    {
        this._CartService.updateCartItem(id,count).subscribe({
          next:(response)=>{this.cartDetails = response.data
            this.toastr.info('quantity has been updated successfully.', 'Cart Updated!',
              {
                closeButton:true,
                timeOut:3000,
                progressBar:true,
                progressAnimation:"increasing"
              }
            );
          },
          error:(err)=>{console.log(err)}
        })
    }

}
