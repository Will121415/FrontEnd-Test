import { Invoice } from 'src/app/models/invoice_model';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { InvoiceService } from 'src/app/core/invoice/invoice.service';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceDetail } from 'src/app/models/invoice_detail_model';
import { AlertDialogComponent } from 'src/app/@base/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'idInvoice', 'saleDate', 'idClient', 'subtotal' , 'totalIva',
    'total'
  ];

  detail: InvoiceDetail[];
  invoices: Invoice[] = [
    {
      idInvoice: '',idClient: '',invoiceDetails: null ,saleDate: '',subtotal: 0,totalIva: 0,
      total: 0,addInvoiceDetails: null,calcularteTotalIva: null,calculateSubtotal: null,calculateTotal: null
    }
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.getInvoices();
  }
  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog
    ) {
  }

  getInvoices() {
    this.invoiceService.get().subscribe( i => {
      if(i != null)
      {
        this.invoices = i;
        console.log(this.invoices);
        this.dataSource =  new MatTableDataSource<Invoice>(this.invoices);
        this.dataSource.paginator = this.paginator;
      }else {
        this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: { title: 'Resultado Operacion!', message: 'No se encontraron ventas',
                    nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
        });
      }
    });
  }

}
