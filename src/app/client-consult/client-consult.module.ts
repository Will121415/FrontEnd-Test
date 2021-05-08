import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientConsultRoutingModule } from './client-consult-routing.module';
import { ClientConsultComponent } from './components/client-consult/client-consult.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ClientConsultComponent
  ],
  imports: [
    CommonModule,
    ClientConsultRoutingModule,
    MaterialModule
  ]
})
export class ClientConsultModule { }
