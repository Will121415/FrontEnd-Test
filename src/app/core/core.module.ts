import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierService } from './supplier/supplier.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    SupplierService,

  ]
})
export class CoreModule { }
