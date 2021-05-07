import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierRegisterComponent } from './components/supplier-register/supplier-register.component';

const routes: Routes = [
  {path: '', component: SupplierRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
