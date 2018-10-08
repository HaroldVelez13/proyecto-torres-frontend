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
  public $Category = new Subject<any>();
  

  constructor(private http: HttpClient) {
    this.url = API_URL+'categories/';
   }

  public getCategories():Observable<[ICategory]>{
    return this.$Categories.asObservable();
  }

  public getCategory():Observable<ICategory>{
    return this.$Category.asObservable();
  }
  
  public getAll():Observable<[ICategory]> {
    return this.http.get<any>(this.url)
      .pipe( map((data) => {
          let categories = data.categories;
          this.$Categories.next(categories);
          return categories;
    }));   
  }

  public show(id:number):Observable<ICategory>{
    let url = this.url+id;
    return this.http.get<any>(url)
    .pipe(map((data) => {   
        let category = data.category;
        this.$Category.next(category);
        return  category;
    }));
  }

  public create(category: ICategory):Observable<ICategory> {

    return this.http.post<any>(this.url+'create', category)
      .pipe(map((data) => {
          let categories = data.categories;
          this.$Categories.next(categories);
          return  categories;
      }));
  }
	public update(category: ICategory):Observable<ICategory> {
	    
    return this.http.put<any>(this.url+category.id+'/update', category)
      .pipe(map((data) => {
        let categories = data.categories;
        this.$Categories.next(categories);
        return categories;
      }));
  }

  public delete(id: number):Observable<ICategory> {
    return this.http.delete<any>(this.url+id+'/delete')
      .pipe( map((data) => {
          let categories = data.categories;
          this.$Categories.next(categories);
        return categories;
      }));
  }
    
}
