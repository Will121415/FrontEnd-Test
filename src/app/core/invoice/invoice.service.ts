import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error.service';
import { Invoice } from 'src/app/models/invoice_model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseUrl: string = 'https://localhost:5001/';
  constructor(private http: HttpClient,
              private handleErrorService: HandleHttpErrorService) {
  }

  post(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.baseUrl + 'api/Invoice', invoice)
           .pipe(tap(_ => this.handleErrorService.log('factura enviada')),
            catchError(this.handleErrorService.handleError<Invoice>('Error al registra la factura' , null))
    );
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'api/Invoice')
    .pipe(tap(_ => this.handleErrorService.log('Facturas Contadas..!')),
    catchError(this.handleErrorService.handleError<number>('Error al contar las facturas', 0))
    ); }
}
