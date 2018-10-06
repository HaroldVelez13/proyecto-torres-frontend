import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from './icategory';
import { API_URL } from '../../_config/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url:string;
  public $Categories = new Subject<any>();

  constructor(private http: HttpClient) {
    this.url = API_URL+'categories/';
   }

  public getCategories():Observable<[ICategory]>{
    return this.$Categories.asObservable();
  }

  public getAll():Observable<[ICategory]> {
    return this.http.get<any>(this.url)
      .pipe( map((data) => {
          let categories = data.categories.json();
          this.$Categories.next(categories);
          return categories;
    }));   
  }

  public create(category: ICategory):Observable<ICategory> {

    return this.http.post<any>(this.url+'create', category)
      .pipe(map((data) => {
          let categories = data.categories.json();
          this.$Categories.next(categories);
          return  categories;
      }));
  }
	public update(category: ICategory):Observable<ICategory> {
	    
    return this.http.put<any>(this.url+'update/' + category.id, category)
      .pipe(map((data) => {
        let categories = data.categories.json();
        this.$Categories.next(categories);
        return categories;
      }));
  }

  public delete(id: number):Observable<ICategory> {
    return this.http.delete<any>(this.url+'delete/'+ id)
      .pipe( map((data) => {
          let categories = data.categories.json();
          this.$Categories.next(categories);
        return categories;
      }));
  }
    
}
