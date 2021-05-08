import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
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

          alert('Datos Correctos, Bienvenido...!');
          console.log(data);
          this.router.navigate(['/home']);
        },
        error => {
         alert('Datos incorrectos, por favor intente nuevamente...!');
         console.log(error);
        });

  }

}
