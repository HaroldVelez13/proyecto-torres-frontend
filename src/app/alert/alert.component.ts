import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertService} from './alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
	
	private subscription: Subscription;
  public message: any;
    
  constructor(private alertService: AlertService) { }

  ngOnInit() {
	this.subscription = this.alertService.getMessage().subscribe(message => { 
        this.message = message; 
    });

    setTimeout(() => {
      this.close();
    }, 3300);
  }
  close():void{
    this.message = null;
    this.subscription.unsubscribe();

  }
  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }

}
