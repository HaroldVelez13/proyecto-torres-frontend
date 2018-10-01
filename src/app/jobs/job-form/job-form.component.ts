import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as Constants from '../../_config/constants';
import { MatHorizontalStepper, MatStep } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { IJob } from '../ijob';
import { JobService } from '../job.service';

import {UserService} from '../../users/user.service';
import {IUser} from '../../users/iuser';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
	@ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
	jobForm: FormGroup; 
	loading:boolean = false;
	jobId:number;
	stepFormCompleted:boolean = false;
	job:IJob;
	users:IUser[];
	selectedOptions = [];

	validation_messages ={
		'business_person':[
			{ type: 'minLength', message: 'EL Empleador/Empresa debe contar con al menos 5 letras' },
			{ type: 'required', message: 'EL Empleador/Empresa es un campo requerido' }
		],
		'principal_phone':[
			{ type: 'minLength', message: 'El telefono debe contar con al menos 7 numeros' }
		],
		'optional_phone':[
			{ type: 'minLength', message: 'El telefono debe contar con al menos 7 numeros' }
		],
		'city':[
			{ type: 'minLength', message: 'La ciudad debe contar con al menos 5 letras' }
		]
	}

  constructor(private userService : UserService,
  			  private jobService : JobService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.createForms();
  	this.getParam();
  }
	private getParam(){
	  	if ( this.activatedRoute.snapshot.paramMap.get('id') ) {
	  		this.jobId =  parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
	  		this.getJob(this.jobId);
	  	}	  	
	}

    private createForms():void{
	    this.jobForm = this.fb.group({
	    	id: new FormControl(null, []),
	    	business_person: new FormControl(null, [Validators.required, Validators.minLength(5)]),
		    principal_phone: new FormControl(null, [Validators.minLength(7)]),
		    optional_phone: new FormControl(null, [Validators.minLength(7)]),
		    city: new FormControl(null, [Validators.minLength(5)]),
		    init_date: new FormControl(null, []),
		    finish_date: new FormControl(null, []),
		    
	    });
	}

	private getJob(id:number){
		this.jobService.getById(id).subscribe((data)=>{
			this.getUsers(data.users);
			this.setForm(data.job);			
			this.stepFormCompleted=true;
			
			
		});

	}

	private setForm(job){
		this.jobForm.setValue({
				id:					job.id,
				business_person:	job.business_person,
				principal_phone:	job.principal_phone,
				optional_phone:		job.optional_phone,
				city:				job.city,
				init_date:			job.init_date,
				finish_date:		job.finish_date

			});
	}

	private getUsers(selectedUser?){
		this.userService.getAll().subscribe((users:IUser[])=>{
			this.users = users;			 
			this.setSelectedUsers(selectedUser);
			  		
			
		});
	}

	private setSelectedUsers(users){
		if (users) {
			var selected: Array<any> = [ ]; 
			Object.keys(users).forEach(key => {
				let user = users[key].id;
				selected.push(user);				
			});			
			this.selectedOptions = selected;
		}

	}

	private formAction(form:any){
		
		if (this.jobForm.invalid) {
			return
		}

		if (!this.jobId) {
			this.createJob(form);
		}
		if (this.jobId) {
			this.updateJob(form);
		}		
		

	}

	private updateJob(formData){
		console.log(formData);

	}	

	private createJob(formData){

		this.stepFormCompleted=true;
		this.jobService.create(formData).subscribe((job:IJob)=>{
			this.job = job;
			this.getUsers();
			this.next();
		});
		

	}

	private addUsers(){
		this.jobService.addUsers(this.jobId, this.selectedOptions ).subscribe((data)=>{
			console.log(data.job);
			console.log(data.users);
		});

	}

	private next(){
		this.stepper.next();
	}

	private onSelection(event:any){		
		this.selectedOptions = event;
	}


}
