import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IJob } from '../ijob';
import { JobService } from '../job.service';
import * as Constants from '../../_config/constants';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogDeleteComponent } from '../../_helpers-components/dialog-delete/dialog-delete.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: IJob[] = []; 

  constructor( 	private jobService: JobService,
  				private dialog: MatDialog,
              	public snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.loadAllJobs();
  }

  public loadAllJobs(){
	this.jobService.getAll()
		.pipe(first())
		.subscribe(slides => { 
	  		this.jobs = slides; 
		},
		error => {
	 	// console.log(error);
	});

  }

  	public openSnackBar(name) {
		this.snackBar.open('El trabajo '+name+' fue Eliminada con exito', null,{
			duration: 1200,
		});
	}
	public deleteSlide(job, index) {
		var name = job.business_person
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.data = { type: 'El trabajo', name: name };
		this.dialog.open(DialogDeleteComponent, dialogConfig)
		      .afterClosed().subscribe(
		        data => { if (data) {
		                this.jobs.splice(index,1);
		                this.jobService.delete(job.id).pipe(first()).subscribe(() => { 
		                this.loadAllJobs();
		                this.openSnackBar(name);
		                });}
		          });         
}

}
