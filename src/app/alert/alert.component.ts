import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertService} from './alert.service';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy  {
	
  public message: any;
  private subscription: Subscription;
    
  constructor(public snackBar: MatSnackBar, private alertService: AlertService) { }
  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {  
        this.setError(message);     
 
    });
  }

  close():void{
      this.message = null;
      this.subscription.unsubscribe();
  
  }
  ngOnDestroy(){
      this.subscription.unsubscribe();
    }
  private setError(message:string){
    if(message=="Unknown Error" )
    {
      this.message="Ocurrio un Error, intentalo mas tarde";
      this.openSnackBar();
    }else if( message=="" || message== null){
      return
    }
    else{
      this.message = message;
      this.openSnackBar();
    }    
    
  }
  private openSnackBar() {
    this.snackBar.open(this.message, 'Cerrar', {
      duration: 2000,
      verticalPosition:'top',
      panelClass: ['alert-service']
  }).afterDismissed().subscribe(()=>this.close());
}
  

}
