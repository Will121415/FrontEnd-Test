import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertDialogComponent } from 'src/app/@base/alert-dialog/alert-dialog.component';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  isValid: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog

    ) { }


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get control() {
    return this.formGroup.controls;
  }

  onLogin() {
    if (this.formGroup.invalid) {
      return;
    }

    this.authService.login(this.control.userName.value, this.control.password.value)
      .pipe(first())
      .subscribe(
        data => {

          this.dialog.open(AlertDialogComponent, {
            width: '320px',
            data: { title: 'Resultado Operacion!', message: 'Datos Correctos, Bienvenido...!',
                      nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
          });
          console.log(data);
          this.router.navigate(['/home']);
        },
        error => {
          this.dialog.open(AlertDialogComponent, {
            width: '320px',
            data: { title: 'Resultado Operacion!', message: 'Datos incorrectos, por favor intente nuevamente...!',
                      nameBtnOne: 'Close', nameBtnTwo: 'Aceptar', btnEnable: false}
          });
         console.log(error);
        });

  }

}
