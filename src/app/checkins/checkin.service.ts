import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICheckin } from './icheckin';
import { API_URL } from '../_config/constants';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
	private url:string;
	public Checkins$= new Subject<any>();

  constructor(private http: HttpClient) 
  { 
    this.url = API_URL+'checkins/';
  }

  public getCheckins(){
    return this.Checkins$.asObservable();
  }

  public getAll():Observable<[ICheckin]> {
    return this.http.get<any>(this.url)
      .pipe( map((data) => {
          this.Checkins$.next(data.checkins);
      return data.checkins;
    }));
  }

  public getById(id: number):Observable<any> {
    return this.http.get<any>(this.url+id)
      .pipe(map((data) => {
        return data;
      }));
  }

  public create(checkin: ICheckin):Observable<ICheckin> {
      var datePipe = new DatePipe('es-CO');
      checkin.date = datePipe.transform(checkin.date||Date.now(), 'yyyy-MM-dd');

      return this.http.post<any>(this.url+'create/', checkin)
        .pipe(map((data) => {
            this.Checkins$.next(data.checkins);
            return  data.checkins;
        }));
  }

  public update(checkin: ICheckin):Observable<ICheckin> {
    var datePipe = new DatePipe('es-CO');
      checkin.date = datePipe.transform(checkin.date, 'yyyy-MM-dd');
          
      return this.http.put<any>(this.url+checkin.id+'/update' , checkin)
        .pipe(map((data) => {
          this.Checkins$.next(data.checkins);
          return data.checkins;
        }));
    }

  public addTool(id:number,tool_id:number, tool_quantity:number ):Observable<ICheckin> {
    let data = {tool_id,tool_quantity }; 
    data.tool_id=tool_id;
    data.tool_quantity=tool_quantity; 
    return this.http.put<any>(this.url+id+'/addTool' , data)
      .pipe(map((data) => {
        
        return data;
      }));
  }
  public leastTool(id:number,tool_id:number, tool_quantity:number ):Observable<ICheckin> {
    let data; 
    data.tool_id=tool_id;
    data.tool_quantity=tool_quantity; 
    return this.http.put<any>(this.url+id+'/leastTool' , data)
      .pipe(map((data) => {
        return data;
      }));
  }

  public delete(id: number):Observable<ICheckin> {
    return this.http.delete<any>(this.url+'delete/'+ id)
      .pipe( map((data) => {
          this.Checkins$.next(data.checkins);
        return data.checkins;
      }));
  }
}
