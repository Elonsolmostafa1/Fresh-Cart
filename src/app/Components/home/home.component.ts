import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProducts:IProduct[] = [];
  searchItem:string = "";
  isLoading:boolean = false;
  constructor(private _ProductService:ProductService){}

  ngOnInit()
  {
      this.isLoading = true;
      this._ProductService.getAllProducts().subscribe({
          next:(response)=>{
            this.allProducts = response.data;
            this.isLoading = false
          },
          error:(err)=>{console.log(err)
            this.isLoading = false;
          }
      })
  }


}


// Woman Bordeaux Long Sleeve
// split(" ") ==> ["Woman" , "Bordeaux" , "Long" , "Sleeve"]
// slice(0,2) ==> ["Woman" , "Bordeaux"]
// join(' ') ===> Woman Bordeaux