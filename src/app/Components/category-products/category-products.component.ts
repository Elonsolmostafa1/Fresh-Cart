import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit{

  categoryId:string|null = '';
  allProducts:IProduct[] = [];
  isLoading = false;

  constructor(private _ProductService : ProductService , private _ActivatedRoute:ActivatedRoute){}


  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.categoryId = params.get("id");
      if(this.categoryId)
      {
        this._ProductService.getProductsByCateogry(this.categoryId).subscribe({
          next:(response)=>{console.log(response)
            this.allProducts = response.data;
            this.isLoading = false;
          },
          error:(err)=>{console.log(err)
          this.isLoading = false;
          }
        })
      }

    })
  }

}
