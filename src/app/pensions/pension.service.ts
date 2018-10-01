import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPension } from './ipension';
import { API_URL } from '../_config/constants';

@Injectable({
  providedIn: 'root'
})
export class PensionService {
	private url:string;
	public $Pensions= new Subject<any>();

  constructor(private http: HttpClient) { 
  	this.url = API_URL+'pensions/'; 
	}

	public getPensions():Observable<[IPension]>{
		return this.$Pensions.asObservable();
	}

	public getAll():Observable<[IPension]> {
        return this.http.get<any>(this.url)
	        .pipe( map((data) => {
	        		this.$Pensions.next(data.pensions);
					return data.pensions;
				}));
	}


	public create(pension: IPension):Observable<IPension> {

	    return this.http.post<any>(this.url+'create', pension)
		    .pipe(map((data) => {
		    		this.$Pensions.next(data.pensions);
		    		return  data.pensions;
				}));
	}

	public update(pension: IPension):Observable<IPension> {
	    
	    return this.http.put<any>(this.url+'update/' + pension.id, pension)
		    .pipe(map((data) => {
		    	this.$Pensions.next(data.pensions);
					return data.pensions;
				}));
	}

	public delete(id: number):Observable<IPension> {
	    return this.http.delete<any>(this.url+'delete/'+ id)
		    .pipe( map((data) => {
		    		this.$Pensions.next(data.pensions);
					return data.pensions;
				}));
	}
}
