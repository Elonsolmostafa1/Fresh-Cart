import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleSlice'
})
export class TitleSlicePipe implements PipeTransform {

  transform(productTitle:string, numOfWords:number): string {
    return productTitle.split(" ").slice(0,numOfWords).join(" ");
  }

}
