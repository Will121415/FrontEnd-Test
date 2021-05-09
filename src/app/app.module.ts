import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { LOCALE_ID } from '@angular/core';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { InvoiceModule } from './invoice/invoice.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { ProductConsultModule } from './product-consult/product-consult.module';
import { ClientConsultModule } from './client-consult/client-consult.module';
import { SalesModule } from './sales/sales.module';
import { InvoicePipe } from './pipes/invoice.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    ProductModule,
    SupplierModule,
    InvoiceModule,
    HttpClientModule,
    ClientModule,
    AuthModule,
    ProductConsultModule,
    ClientConsultModule,
    SalesModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
