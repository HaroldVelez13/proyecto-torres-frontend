import {Observable,of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {ICarousel} from './icarousel';
import {API_URL} from '../_config/constants';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private url:string;

  Carousel:ICarousel;
  Carousels:[ICarousel];

  constructor(private http: HttpClient) { 

  	this.url = API_URL+'slides/';
  }

	private handleError<T>(operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	      // TODO: send the error to remote logging infrastructure
	      console.log(error); // log to console instead
	      // TODO: better job of transforming error for user consumption
	      
	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	}

  	getHome():Observable<any> {

		var url:string = this.url+'home/';

		return this.http.get<any>(url).pipe( 
			map((data) => { 	

	            this.Carousels = data.slides;
	         	return this.Carousels;        

			}),
	        catchError(this.handleError('slide-home', []))
		);
	}

  	getAll():Observable<any> {

		var url:string = this.url;

		return this.http.get<any>(url).pipe( 
			map((data) => { 	
	            this.Carousels = data.slides;
	         	return this.Carousels;        

			}),
	        catchError(this.handleError('slide-all', []))
		);
	}

  	getById(id:number):Observable<any> {

		var url:string = this.url+id;

		return this.http.get<any>(url).pipe( 
			map((data) => {	            
	            this.Carousel = data.slide;
	         	return this.Carousel;        

			}),
	        catchError(this.handleError('slide-get', []))
		);
	}

	create(carousel:ICarousel):Observable<any> {

		var url:string = this.url+'create';
		
		return this.http.post<any>(url,carousel).pipe( 
			map((data) => { 	
	            
	            this.Carousel = data.slide;
	         	return this.Carousel;        

			}),
	        catchError(this.handleError('slide-get', []))
		);
	}

	update(id:number, carousel:ICarousel):Observable<any> {		
		
		
		return this.http.put<any>(this.url+id+'/update',carousel).pipe( 
			map((data) => { 	
	            
	            this.Carousel = data.slide;
	         	return this.Carousel;        

			}),
	        catchError(this.handleError('slide-get', []))
		);
	}

	delete(id:number):Observable<any> {
		
		return this.http.delete<any>(this.url+id+'/delete').pipe( 
			map((data) => { 	
	            
	            this.Carousel = data.slide;
	         	return this.Carousel;        

			}),
	        catchError(this.handleError('slide-get', []))
		);
	}


}


