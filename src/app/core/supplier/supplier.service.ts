import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/supplier_model';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient,
              private handleErrorService: HandleHttpErrorService) {
  }

  post(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl + 'api/Supplier', supplier)
           .pipe(tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Supplier>('Error al registra proveedor' , null))
    );
  }

 get(): Observable<Supplier[]> {
  return this.http.get<Supplier[]>(this.baseUrl + 'api/Supplier')
  .pipe(tap(_ => this.handleErrorService.log('Proveedores consultados')),
  catchError(this.handleErrorService.handleError<Supplier[]>('Error al consultar los proveedores', null))
  ); }
}
