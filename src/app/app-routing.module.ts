import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
   path: '',
   component: LayoutComponent,
   children: [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'product-register',
      loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
    },
    {
      path: 'supplier-register',
      loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule)
    },
    {
      path: 'invoice',
      loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
    },
    {
      path: 'sales',
      loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
    },
    {
      path: 'client-register',
      loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
    },
    {
      path: 'client-consult',
      loadChildren: () => import('./client-consult/client-consult.module').then(m => m.ClientConsultModule)
    },
    {
      path: 'login',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: 'product-consult',
      loadChildren: () => import('./product-consult/product-consult.module').then(m => m.ProductConsultModule)
    },
    {
      path: 'user-register',
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule)

    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
