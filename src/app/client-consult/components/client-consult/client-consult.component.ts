import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ClientService } from 'src/app/core/client/client.service';
import { Client } from 'src/app/models/client_model';

@Component({
  selector: 'app-client-consult',
  templateUrl: './client-consult.component.html',
  styleUrls: ['./client-consult.component.css']
})
export class ClientConsultComponent implements AfterViewInit  {

  displayedColumns: string[] = [
    'idClient', 'name', 'lastName', 'phone' , 'address',
    'neighborhood', 'city'
  ];
  clients: Client[] = [
    {idClient: '',name: '',lastName: '',phone: '',address: '',neighborhood: '',city: ''}
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.getProduct();
  }
  constructor(private clientService: ClientService) {
  }

  getProduct() {
    this.clientService.get().subscribe(c=> {
      if(c != null)
      {
        this.clients = c;
        console.log(this.clients);
        this.dataSource =  new MatTableDataSource<Client>(this.clients);
        this.dataSource.paginator = this.paginator;
      }else {
        alert('No se encontraron productos');
      }
    });
  }

}
