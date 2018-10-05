import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import  { MatSnackBar,
			    MatDialog, 
			    MatDialogConfig
		    } from '@angular/material';

import {IPension} from '../ipension';
import {PensionService} from '../pension.service';
import { DialogDeleteComponent } from '../../../_helpers-components/dialog-delete/dialog-delete.component';

import { PensionFormComponent} from '../pension-form/pension-form.component';

@Component({
  selector: 'app-pension-list',
  templateUrl: './pension-list.component.html',
  styleUrls: ['./pension-list.component.css']
})
export class PensionListComponent implements OnInit {

	displayedColumns: string[] = ['index','name', 'users_count', 'actions'];	
	Pensions = new PensionDataSource(this.pensionService);	
  constructor(	private pensionService: PensionService,
  				private dialog: MatDialog,
              	public snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.getAllPensions();
  }

  	public getAllPensions(){
		this.pensionService.getAll().subscribe();
	}

	public deleteEps(pension:IPension):void{

		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;        
		dialogConfig.data = { type: 'La Pension', name: pension.name };
		this.dialog.open(DialogDeleteComponent, dialogConfig)
	      .afterClosed().subscribe(
	        data => { if (data) {
	                	this.pensionService.delete(pension.id).pipe(first()).subscribe(() => { 
	                	this.openSnackBar(pension.name);
	                 });
	                }
	        });  		
	}
  	public openFormPension(pension?:IPension){

		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;    
		if (pension) {
			dialogConfig.data = pension;
		}else{
			dialogConfig.data = false;
		}
		
		this.dialog.open(PensionFormComponent, dialogConfig)
			.afterClosed().subscribe(
				formValue => { 
					if (formValue && pension) {
						this.updatePension(formValue);
					}
					if (formValue && !pension) {
						this.createPension(formValue);
					}
				}
			);
	}

  	private updatePension(pension:IPension){
		this.pensionService.update(pension).subscribe();

  	}

  	private createPension(pension:IPension){
  		this.pensionService.create(pension).subscribe();
  	}

  	private openSnackBar(name) {
      this.snackBar.open('La Pension '+name+' Fue Eliminada con exito', null,{
        duration: 1200,
      });
    }

}

export class PensionDataSource extends DataSource<[IPension]> {

  constructor(private pensionService: PensionService) {
    super(); 	
  }
  connect(): Observable<any> { 
      	return this.pensionService.getPensions();  
  }
  disconnect() {}
}
