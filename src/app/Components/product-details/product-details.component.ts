import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  isLoading:boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  productId:string|null = null;
  productDetails?:IProduct;
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService,private _CartService:CartService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe((params)=>{this.productId = params.get("id")})
    
    if(this.productId!=null)
    {
      this._ProductService.getProductById(this.productId).subscribe({
        next:(response)=>{
          this.productDetails = response.data;
          this.isLoading = false;
          
          console.log(this.productDetails)
          //this.productDetails = response;
        },
        error:(err)=>{console.log(err)
          this.isLoading= false;
        }
      })
    }
  }

  addToCart(id:any)
  {
      this._CartService.addCartItem(id).subscribe({
        next:(response)=>{console.log(response)
          this._CartService.cartItemsNum.next(response.numOfCartItems)
          this.toastr.success('Successfully added to cart!', 'Product Added!',{
            closeButton:true,
            timeOut:3000,
            progressBar:true,
            progressAnimation:"increasing"
          });

        },
        error:(err)=>{console.log(err)}
      })
  }
}
