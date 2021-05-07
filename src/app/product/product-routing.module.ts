import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductRegisterComponent } from './components/product-register/product-register.component';

const routes: Routes = [
  {path:'', component: ProductRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
