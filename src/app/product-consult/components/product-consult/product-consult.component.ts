import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProductService } from 'src/app/core/product/product.service';
import { Product } from 'src/app/models/product_model';

@Component({
  selector: 'app-product-consult',
  templateUrl: './product-consult.component.html',
  styleUrls: ['./product-consult.component.css']
})
export class ProductConsultComponent implements AfterViewInit  {
  displayedColumns: string[] = [
    'idProduct', 'name', 'status', 'quantityStock' , 'unitMeasure',
    'purchasePrice', 'salePrice', 'supplier', 'suppliernit'
  ];
  products: Product[] = [
    {idProduct: '',name: '',purchasePrice: 0, salePrice: 0,iva: 0, description: '',quantityStock: 0,status: '',unitMeasure: '',supplier: {name:'',nit: '',phone: ''}},
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.getProduct();
  }
  constructor(private productService: ProductService) {
  }

  getProduct() {
    this.productService.get().subscribe(p=> {
      if(p != null)
      {
        this.products = p;
        console.log(this.products);
        this.dataSource =  new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
      }else {
        alert('No se encontraron productos');
      }
    });
  }

}
