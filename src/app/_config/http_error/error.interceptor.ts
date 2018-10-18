import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(location: Location,private router:Router) {}
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            var error;            
            
            if (err.status === 401) {
                // auto logout if 401 response returned from api                 
                this.router.navigate(['/login']); 
                //console.log(err.status);
            }
            else if (err.status === 0) {
                error = "Comprueba tu conexion a Internet y Vuelve a Intentarlo";
            }else if (err.status === 500) {
                error = "Ocurrio un Error, intentalo mas tarde";
            }          
            else{
                error = err.error.message || err.statusText;
            }            
            
            return throwError(error);
            
        }))
    }
}