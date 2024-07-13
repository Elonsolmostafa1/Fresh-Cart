import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  data: any[] = [];
  metadata: any = {};
  currentPage: number = 1;
  limit: number = 18;

  constructor(private _ProductService: ProductService) {}

  ngOnInit(): void {
    this._ProductService.getProductsByPageNumber(2, this.limit).subscribe({
      next: (response) => {
        console.log(response);
        this.data = response.results;
        this.metadata = response.metadata;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  
}
