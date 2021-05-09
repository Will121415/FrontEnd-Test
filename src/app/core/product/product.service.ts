import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error.service';
import { Product } from 'src/app/models/product_model';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient,
    private handleErrorService: HandleHttpErrorService) {
  }

  post(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'api/Product', product)
      .pipe(tap(_ => this.handleErrorService.log('producto enviados')),
        catchError(this.handleErrorService.handleError<Product>('Error al registra producto', null))
      );
  }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'api/Product')
      .pipe(tap(_ => this.handleErrorService.log('productos consultados')),
        catchError(this.handleErrorService.handleError<Product[]>('Error al consultar productos', null))
      );
  }

  changeStatus(idProduct: string): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + 'api/Product/' + idProduct, null)
      .pipe(tap(_ => this.handleErrorService.log('Cambio de estado exitoso')),
        catchError(this.handleErrorService.handleError<Product>('Error al cambiar el estado del producto', new Product()))
      );
  }
}
