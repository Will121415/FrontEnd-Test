import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, catchError } from 'rxjs/operators'
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error.service';
import { User } from 'src/app/models/user_model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient,
              private handleErrorService: HandleHttpErrorService) {
  }


  post(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'api/User', user)
         .pipe(tap(_ => this.handleErrorService.log('Usuario registrado')),
          catchError(this.handleErrorService.handleError<User>('Error al registrar el usuario' , null))
    );
  }
}
