import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product_model';

@Pipe({
  name: 'filterInvoice'
})
export class InvoicePipe implements PipeTransform {

  transform(products: Product[], searchText: string): any {
    if (searchText == null) { return products.slice(0, 5); }
    return products.filter(p => p.idProduct.toLowerCase().indexOf(searchText.toLowerCase()) !== -1).slice(0, 5);
}


}
