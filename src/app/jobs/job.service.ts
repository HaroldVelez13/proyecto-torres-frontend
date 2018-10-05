import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IJob } from './ijob';
import { API_URL } from '../_config/constants';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class JobService {
	private url:string;
	public $jobs= new Subject<any>();

  constructor( private http: HttpClient ) {
  	this.url = API_URL+'jobs/'; 
   }

	public getJobs():Observable<IJob[]>{
		return this.$jobs.asObservable();
	}

	public getAll():Observable<[IJob]> {
        return this.http.get<any>(this.url)
	        .pipe( map((data) => {
	        		this.$jobs.next(data.jobs);
					return data.jobs;
				}));
	}

	public getById(id: number):Observable<any> {

	    return this.http.get<any>(this.url+ id)
		    .pipe(map((data) => {
					return data;
				}));
	}


	public create(job: IJob):Observable<IJob> {
		var datePipe = new DatePipe('es-CO');
	    job.init_date = datePipe.transform(job.init_date, 'yyyy-MM-dd');
	    if (job.finish_date) {
	    	job.finish_date = datePipe.transform(job.finish_date, 'yyyy-MM-dd');
	    }
	    return this.http.post<any>(this.url+'create', job)
		    .pipe(map((data) => {
		    		//this.$jobs.next(data.jobs);
		    		return  data.job;
				}));
	}

	public addUsers(jobId: number, users:any[number]):Observable<any> {

		var url = this.url+jobId+'/addUsers';
	    return this.http.post<any>(url, users)
		    .pipe(map((data) => {
		    		//this.$jobs.next(data.jobs);
		    		return  data;
				}));
	}

	public update(job: IJob):Observable<IJob> {
		var datePipe = new DatePipe('es-CO');
	    job.init_date = datePipe.transform(job.init_date, 'yyyy-MM-dd');
	    if (job.finish_date) {
	    	job.finish_date = datePipe.transform(job.finish_date, 'yyyy-MM-dd');
	    }	    
	    return this.http.put<any>(this.url+'update/' + job.id, job)
		    .pipe(map((data) => {
		    	//this.$jobs.next(data.jobs);
					return data.job;
				}));
	}

	public delete(id: number):Observable<IJob> {
	    return this.http.delete<any>(this.url+'delete/'+ id)
		    .pipe( map((data) => {
		    		//this.$jobs.next(data.jobs);
					return data.job;
				}));
	}
}
