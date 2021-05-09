import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error.service';
import { Client } from 'src/app/models/client_model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient,
              private handleErrorService: HandleHttpErrorService) {
  }

  post(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl + 'api/Client', client)
           .pipe(tap(_ => this.handleErrorService.log('Cliente enviados')),
            catchError(this.handleErrorService.handleError<Client>('Error al registra cliente' , null))
    );
  }

  getClient(idClient: string): Observable<Client> {
    return this.http.get<Client>(this.baseUrl + 'api/Client/' + idClient)
    .pipe(tap(_ => this.handleErrorService.log('Cliente encontrado')),
    catchError(this.handleErrorService.handleError<Client>('Error al consultar el cliente', new Client()))
    );
  }

  get(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + 'api/Client')
    .pipe(tap(_ => this.handleErrorService.log('Clientes consultados')),
    catchError(this.handleErrorService.handleError<Client[]>('Error al consultar los clientes', null))
    ); }
}
