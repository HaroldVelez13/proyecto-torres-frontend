import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { IUser } from './iuser';
import { API_URL } from '../_config/constants';
import {DatePipe} from '@angular/common';



@Injectable()
export class UserService {

	private url:string;

  constructor(private http: HttpClient) {

  	this.url = API_URL+'users/';

   }

  	getAll():Observable<IUser[]> {
        return this.http.get<any>(this.url)
	        .pipe( map((data) => {
					return data.users;
				}));
	}

  	getEpsPensions():Observable<any> {
        return this.http.get<any>(this.url+'epsPensions')
	        .pipe( map((data) => {
					return data;
				}));
	}

	getById(id: number):Observable<any> {

	    return this.http.get<any>(this.url + id)
		    .pipe(map((data) => {
					return data;
				}));
	}

	create(user: IUser):Observable<IUser> {

		var datePipe = new DatePipe('es-CO');
	    user.birthday = datePipe.transform(user.birthday, 'yyyy-MM-dd');
	    user.init_at = datePipe.transform(user.init_at, 'yyyy-MM-dd');

	    return this.http.post<any>(this.url+'create', user)
		    .pipe(map((data) => {
					return data.user;
				}));
	}

	update(user: IUser):Observable<IUser> {

		var datePipe = new DatePipe('es-CO');
	    user.birthday = datePipe.transform(user.birthday, 'yyyy-MM-dd');
	    user.init_at = datePipe.transform(user.init_at, 'yyyy-MM-dd');
	    if (user.finish_at) {
	    	user.finish_at = datePipe.transform(user.init_at, 'yyyy-MM-dd');
	    }
	    
	    
	    return this.http.put<any>(this.url+'update/' + user.id, user)
		    .pipe(map((data) => {
					return data.user;
				}));
	}

	delete(id: number):Observable<IUser> {
	    return this.http.delete<any>(this.url+'delete/'+ id)
		    .pipe( map((data) => {
					return data.user;
				}));
	}

	changePassword(id: number, form:any):Observable<any> {
	    return this.http.put<any>(this.url+'changePassword/'+ id, form)
		    .pipe( map((data) => {
					return data;
				}));
	}
}
