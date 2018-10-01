import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let headers: any;
		// Si el usuario está logueado, de lo contrario no adjuntar estos headers
		// pues puede que el endpoint que estamos llamando es el Login o Register
		// los cuales no requerir que el usuario esté autenticado, sería estupido.
		if (localStorage.getItem('token')) {
		    // Adjuntamos los headers a la petición
		    headers = new HttpHeaders({
		        'Authorization': 'Bearer ' + localStorage.getItem('token'),
		        'Content-Type': 'application/json',
		        'Accept': 'application/json'
		    });
		}else{
            headers = new HttpHeaders({
			    'Accept'      : 'application/json',
			    'Content-Type':  'application/json'
			  });
		}
		const cloneReq = request.clone({headers});

		return next.handle(cloneReq);
	}
}
