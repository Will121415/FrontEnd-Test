import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ClientService } from 'src/app/core/client/client.service';
import { InvoiceService } from 'src/app/core/invoice/invoice.service';
import { ProductService } from 'src/app/core/product/product.service';
import { Client } from 'src/app/models/client_model';
import { InvoiceDetail } from 'src/app/models/invoice_detail_model';
import { Invoice } from 'src/app/models/invoice_model';
import { Product } from 'src/app/models/product_model';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoice: Invoice;
  client: Client;
  products: Product[];
  invoiceDetail: InvoiceDetail;
  formGroupClient: FormGroup;
  formGroupInvoice: FormGroup;
  formGroupDetail: FormGroup;
  searchText: string;
  stock: number;
  invoiceAux: Invoice;

  constructor(
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
  ) { this.buildForm(); }

  ngOnInit() {
    this.get();
  }

  private buildForm() {

    this.client = new Client();
    this.client.idClient = '';
    this.client.name = '';
    this.client.lastName  = '';

    this.formGroupClient = this.formBuilder.group({
      idClient: [this.client.idClient, Validators.required],
      name: [{value: this.client.name, disabled: true}],
      lastName: [{value: this.client.lastName, disabled: true}]
    });


    this.invoice =  new Invoice();

     this.formGroupInvoice = this.formBuilder.group({
      idInvoice: [{value: this.invoice.idInvoice, disabled: true}]

    });
    this.addNumber();
  }

  addNumber() {
    this.invoiceService.getCount().subscribe(count => {
      console.log(count);
      const numero = this.PadLeft(count, 4);
      this.formGroupInvoice.get('idInvoice').setValue(numero);
      this.invoice.idInvoice = numero;
      console.log(this.invoice);
    });
  }
  PadLeft(value, length) {
    return (value.toString().length < length) ? this.PadLeft('0' + value, length) : value;
}

  cleanForm() {
    this.formGroupClient.reset();
    this.formGroupInvoice.reset();
  }

  get controlClient() {
    return this.formGroupClient.controls;
  }
  get controlInvoice() {
    return this.formGroupInvoice.controls;
  }
  get controlDetail() {
    return this.formGroupDetail.controls;
  }

  get() {
    this.productService.get().subscribe(p => {
      console.log(p);
      this.products = p;
     });
  }

  search(): void {
    const idClient = this.formGroupClient.value.idClient;
    console.log(this.invoice);

    this.clientService.getClient(idClient).subscribe( c => {
      if (c.idClient !== undefined ) {

        alert("Cliente Encontrado...!");

        this.client = c;
        this.invoice.idClient = this.client.idClient;
        this.fillFields (this.client);


      } else {

        alert("Cliente NO Encontrado...!");
      }
    });
  }

  fillFields (client: Client) {
    this.formGroupClient.get('name').setValue(this.client.name);
    this.formGroupClient.get('lastName').setValue(this.client.lastName);
  }

  addDetail (product: Product, q: string, p: string, d: string): void {
    console.log(this.client);

    if (this.client.idClient !== '' ) {
      // tslint:disable-next-line: radix
      const quantity = parseInt(q);
      // tslint:disable-next-line: radix
      const price = parseInt(p);
      // tslint:disable-next-line: radix
      const discount = parseInt(d);


      this.invoice.addInvoiceDetails(product, quantity, discount, price);
      this.invoice.calculateTotal();

    } else {
     alert("Debe agregar un CLIENTE a la factura...!")
    }

  }

  delete (index): void {
    this.invoice.invoiceDetails.splice(index, 1);
    this.invoice.calculateTotal();
  }

  addInvoice(): void {
    // this.invoiceAux = this.invoice;
    // this.invoiceAux.invoiceDetails[0].product = new Product();

    console.log(this.invoice);
    console.log(this.invoice.invoiceDetails.length !== 0);
    if (this.invoice.invoiceDetails.length !== 0) {

      this.invoiceService.post(this.invoice).subscribe(i => {
        if ( i != null ) {
          alert("Factura Guardada...! :)");
          this.invoice = new Invoice();
          this.cleanForm();
        }
      });

    } else {
     alert("Debe agragar productos a la factura...!");
    }
  }
}
