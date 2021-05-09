import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AlertDialogComponent } from 'src/app/@base/alert-dialog/alert-dialog.component';
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
    'purchasePrice', 'salePrice', 'supplier', 'suppliernit', 'action'
  ];
  products: Product[] = [
    {idProduct: '',name: '',purchasePrice: 0, salePrice: 0,iva: 0, description: '',quantityStock: 0,status: '',unitMeasure: '',supplier: {name:'',nit: '',phone: ''}},
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.getProduct();
  }
  constructor(
    private productService: ProductService,
    private dialog: MatDialog
    ) {
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
        this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: { title: 'Resultado Operacion!', message: 'No se encontro ningun producto',
                    nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
        });
      }
    });
  }
  toDisable(element)
  {
    this.productService.changeStatus(element.idProduct).subscribe(p => {
      if(p != null)
      {
        this.getProduct();
        this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: { title: 'Resultado Operacion!', message: 'Cambio de estado exitoso..!',
                    nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
        });
      }else {
        this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: { title: 'Resultado Operacion!', message: 'Error: no se pudo cambiar el estado del producto',
                    nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
        });
      }
    });
  }

}
