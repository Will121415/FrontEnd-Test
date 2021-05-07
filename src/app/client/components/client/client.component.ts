import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/core/client/client.service';
import { Client } from 'src/app/models/client_model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientForm: FormGroup;
  client: Client;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService
    ) { this.buildForm();}

  ngOnInit(): void {
  }

  private buildForm()
  {
    this.client = new Client();

    this.clientForm = this.fb.group({
      idClient: [this.client.idClient, Validators.required],
      name: [this.client.name, Validators.required],
      lastName: [this.client.lastName, Validators.required],
      phone: [this.client.phone, Validators.required],
      address: [this.client.address, Validators.required],
      neighborhood: [this.client.neighborhood, Validators.required],
      city: [this.client.city, Validators.required]
    });

  }
  onSubmit() {
    if(this.clientForm.invalid) {return;}

    this.client = this.clientForm.value;

    this.clientService.post(this.client).subscribe(c => {
        if (c != null )
        {
          alert("Cliente Guardado...!");
          console.log(c);
          this.clientForm.reset();
        }
    });



  }

  get clientControl() {
    return this.clientForm.controls;
  }

}
