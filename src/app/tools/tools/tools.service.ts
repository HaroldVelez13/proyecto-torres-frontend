import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITool } from './itool';
import { API_URL } from '../../_config/constants';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private url:string;
  public $Tools = new Subject<any>();

  constructor(private http: HttpClient) {
    this.url = API_URL+'tools/';
  }

  public getTools():Observable<[ITool]>{
    return this.$Tools.asObservable();
  }

  public getAll():Observable<[ITool]> {
    return this.http.get<any>(this.url)
      .pipe( map((data) => {
          let tools = data.tools;
          this.$Tools.next(tools);
          return tools;
    }));   
  }

  public create(category: ITool):Observable<ITool> {

    return this.http.post<any>(this.url+'create', category)
      .pipe(map((data) => {
          let tools = data.tools;
          this.$Tools.next(tools);
          return  tools;
      }));
  }
	public update(category: ITool):Observable<ITool> {
	    
    return this.http.put<any>(this.url+'update/' + category.id, category)
      .pipe(map((data) => {
        let tools = data.tools;
        this.$Tools.next(tools);
        return tools;
      }));
  }

  public delete(id: number):Observable<ITool> {
    return this.http.delete<any>(this.url+'delete/'+ id)
      .pipe( map((data) => {
          let tools = data.tools;
          this.$Tools.next(tools);
        return tools;
      }));
  }
}
