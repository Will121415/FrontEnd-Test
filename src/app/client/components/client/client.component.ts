import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/@base/alert-dialog/alert-dialog.component';
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
    private clientService: ClientService,
    private dialog: MatDialog
    ) { this.buildForm();}

  ngOnInit(): void {
  }

  private buildForm()
  {
    this.client = new Client();

    this.clientForm = this.fb.group({
      idClient: [null, Validators.required],
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      neighborhood: [null, Validators.required],
      city: [null, Validators.required]
    });

  }
  onSubmit() {
    if(this.clientForm.invalid) {return;}

    this.client = this.clientForm.value;

    this.clientService.post(this.client).subscribe(c => {
        if (c != null )
        {
          this.dialog.open(AlertDialogComponent, {
            width: '250px',
            data: { title: 'Resultado Operacion!', message: 'El cliente ha sido guardado...!',
                      nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
          });
          console.log(c);
          this.clientForm.reset();
        }else {
          this.dialog.open(AlertDialogComponent, {
            width: '250px',
            data: { title: 'Resultado Operacion!', message: 'Error: no se pudo guardar el cliente',
                      nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
          });
        }
    });



  }

  get clientControl() {
    return this.clientForm.controls;
  }

}
