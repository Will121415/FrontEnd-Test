import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/@base/alert-dialog/alert-dialog.component';
import { UserService } from 'src/app/core/user/user.service';
import { User } from 'src/app/models/user_model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  roles: string[] = ['SalesPrfsnal', 'AvaluoLeader', 'Interested'];
  statuses: string[] = ['Active', 'Inactive'];

  user: User;
  userForm: FormGroup;


  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog
    ) {
      this.buildForm();
   }

  ngOnInit(): void {
  }

  private buildForm()
  {
    this.user = new User();
    this.userForm = this.fb.group({

      userName: [this.user.userName, Validators.required],
      password: [this.user.password, Validators.required],
      status: [this.user.status, Validators.required],
      role: [this.user.role, Validators.required]

    });
  }

  get controlUser() {
    return this.userForm.controls;
  }

  onSubmit() {

    if(this.userForm.invalid) {return;}

    this.user = this.userForm.value;

    this.userService.post(this.user).subscribe(u => {

      if (u != null) {
        this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: { title: 'Resultado Operacion!', message: 'Usuario Creado..!',
                    nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
        });
        this.buildForm();
      } else {
        this.dialog.open(AlertDialogComponent, {
          width: '250px',
          data: { title: 'Resultado Operacion!', message: 'Error: no se pudo registrar el producto',
                    nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
        });
      }

    });

  }

}
