import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEps } from './ieps';
import { API_URL } from '../../_config/constants';

@Injectable({
  providedIn: 'root'
})
export class EpsService {

private url:string;
public $Epses= new Subject<any>();


  constructor(private http: HttpClient) {
  this.url = API_URL+'eps/'; }

  	public getEpses():Observable<[IEps]>{
  		return this.$Epses.asObservable();
  	}

  	public getAll():Observable<[IEps]> {
        return this.http.get<any>(this.url)
	        .pipe( map((data) => {
	        		this.$Epses.next(data.epses);
	        		console.log(data.epses);
					return data.epses;
				}));
	}


	public create(eps: IEps):Observable<IEps> {

	    return this.http.post<any>(this.url+'create', eps)
		    .pipe(map((data) => {
		    		this.$Epses.next(data.epses);
		    		return  data.epses;
				}));
	}

	public update(eps: IEps):Observable<IEps> {
	    
	    return this.http.put<any>(this.url+'update/' + eps.id, eps)
		    .pipe(map((data) => {
		    	this.$Epses.next(data.epses);
					return data.epses;
				}));
	}

	public delete(id: number):Observable<IEps> {
	    return this.http.delete<any>(this.url+'delete/'+ id)
		    .pipe( map((data) => {
		    		this.$Epses.next(data.epses);
					return data.epses;
				}));
	}
}
