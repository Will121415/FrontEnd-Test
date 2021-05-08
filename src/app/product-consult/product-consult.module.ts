import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductConsultRoutingModule } from './product-consult-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductConsultComponent } from './components/product-consult/product-consult.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [ProductConsultComponent],
  imports: [
    CommonModule,
    ProductConsultRoutingModule,
    MaterialModule
  ]
})
export class ProductConsultModule { }
