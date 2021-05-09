import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { InvoicePipe } from '../pipes/invoice.pipe';
import localeCO from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeCO);


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    InvoicePipe,
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    InvoicePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule { }
