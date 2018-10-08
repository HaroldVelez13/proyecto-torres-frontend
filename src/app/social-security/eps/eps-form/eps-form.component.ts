import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {IEps} from '../ieps';

@Component({
  selector: 'app-eps-form',
  templateUrl: './eps-form.component.html',
  styleUrls: ['./eps-form.component.css']
})
export class EpsFormComponent implements OnInit {

	epsForm:FormGroup;
	Eps:IEps;
	validation_messages = {		
	'name': [{ type: 'required', message: 'El nombre es un campo Requerido' }]
	};	
  constructor(	private dialogRef: MatDialogRef<EpsFormComponent>,
  				@Inject(MAT_DIALOG_DATA) public data:any,
  				private fb: FormBuilder) 
  { 
  	this.Eps = data;
  }

  ngOnInit() {
  	this._createForms();
  }

public accept():void{    	
  if (this.epsForm.invalid) {
      return;
  }
  this.dialogRef.close(this.epsForm.value);   	
}

public cancel():void{
    this.dialogRef.close(false);        
} 
    
private _createForms():void{

  this.epsForm = this.fb.group({	 
    id: new FormControl(null, []),   	
    name: new FormControl(null,Validators.required)   
  });

  if (this.Eps) { this._setForm(); }	   	

	}

private _setForm():void{
  this.epsForm.setValue({
    id:this.Eps.id,
    name:this.Eps.name
  });
}


}
