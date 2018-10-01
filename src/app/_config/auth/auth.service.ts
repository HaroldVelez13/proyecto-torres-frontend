import {Observable , Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {IUser} from '../../users/iuser';
import {API_URL} from '../constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string;
  public $rol= new Subject<any>();

  

  constructor(private http: HttpClient) { 

  	this.url = API_URL;  	 	

  }

	public login(email:string, password:string):Observable<any> {

		var datos:{} = { email: email, password: password };
		
		return this.http.post<any>(this.url+'login', datos).pipe( 
			map((data) => { 				
				// login successful if there's a jwt token in the response
		        if (data.user && data.token && data.rol) {
		        	this._initStorage(data);
	            	return data.user;	         		
		        }
		        

			}));
	}

	public logout():any {   
		
		return this.http.post<any>(this.url+'logout','').pipe(      
	    map(()=>{
	    	this._clearStorage();
	    	return true;
		    })
		    
	    );	
		
	        
	}

	public initRol(){
		let rol=JSON.parse(localStorage.getItem("rol"));
		this.$rol.next(rol);
	}

	public getRol(): Observable<any>{	

			return this.$rol.asObservable();
	}

	public isLogin():any{		
		if (localStorage.getItem('currentUser')) {
			return true;
		}
		return false;
	}

	private _clearStorage():void{
		// remove user from local storage to log user out
	    localStorage.removeItem('currentUser');
	    localStorage.removeItem('token');
	    localStorage.removeItem('rol');
		let rol=JSON.parse(localStorage.getItem("rol"));
		this.$rol.next(rol);
	}

	private _initStorage(data){
		// store user details and jwt token in local storage to keep user logged in between page refreshes
		localStorage.setItem('currentUser', JSON.stringify(data.user));
		localStorage.setItem('token', data.token);
		localStorage.setItem('rol',  JSON.stringify(data.rol));
		let rol = JSON.parse(localStorage.getItem("rol"));
		this.$rol.next(rol);
	}

}
