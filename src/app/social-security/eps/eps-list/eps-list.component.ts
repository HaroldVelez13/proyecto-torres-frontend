import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import  { MatSnackBar,
			    MatDialog, 
			    MatDialogConfig
		    } from '@angular/material';

import {IEps} from '../ieps';
import {EpsService} from '../eps.service';
import { DialogDeleteComponent } from '../../../_helpers-components/dialog-delete/dialog-delete.component';

import { EpsFormComponent} from '../eps-form/eps-form.component';


@Component({
  selector: 'app-eps-list',
  templateUrl: './eps-list.component.html',
  styleUrls: ['./eps-list.component.css']
})
export class EpsListComponent implements OnInit {

	displayedColumns: string[] = ['index','name', 'users_count', 'actions'];	
	Epses = new EpsDataSource(this.epsService);	


  constructor(	private epsService: EpsService,
  				      private dialog: MatDialog,
              	public snackBar: MatSnackBar) { 
  	 
  }

	ngOnInit() {
		this.getAllEps();

	}

	public getAllEps(){
		this.epsService.getAll().subscribe();
	}


	public deleteEps(eps:IEps):void{
			const dialogConfig = new MatDialogConfig();

			dialogConfig.disableClose = false;        
			dialogConfig.data = { type: 'La Eps', name: eps.name };
			this.dialog.open(DialogDeleteComponent, dialogConfig)
						.afterClosed().subscribe(
							data => { if (data) {
											this.epsService.delete(eps.id).pipe(first()).subscribe(() => { 
											this.openSnackBar(eps.name);
											});
										}
									});  		
	}

	public openFormEps(eps?:IEps){

	const dialogConfig = new MatDialogConfig();

	dialogConfig.disableClose = false;    
	if (eps) {
		dialogConfig.data = eps;
	}else{
		dialogConfig.data = false;
	}
	
	this.dialog.open(EpsFormComponent, dialogConfig)
		.afterClosed().subscribe(
			formValue => { 
				if (formValue && eps) {
					this.updateEps(formValue);
				}
				if (formValue && !eps) {
					this.createEps(formValue);
				}
		});
	}

	private updateEps(eps:IEps){
	this.epsService.update(eps).subscribe();

	}

	private createEps(eps:IEps){
		this.epsService.create(eps).subscribe();
	}

	private openSnackBar(name) {
		this.snackBar.open('La Eps '+name+' Fue Eliminada con exito', null,{
			duration: 1200,
		});
	}

}

export class EpsDataSource extends DataSource<[IEps]> {

  constructor(private epsService: EpsService) {
    super(); 	

  }
  connect(): Observable<any> { 
      	return this.epsService.getEpses();      
  }
  disconnect() {}
}
