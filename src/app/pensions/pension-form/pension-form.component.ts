import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {IPension} from '../ipension';

@Component({
  selector: 'app-pension-form',
  templateUrl: './pension-form.component.html',
  styleUrls: ['./pension-form.component.css']
})
export class PensionFormComponent implements OnInit {

	pensionForm:FormGroup;
	Pension:IPension;
	validation_messages = {		
	'name': [{ type: 'required', message: 'El nombre es un campo Requerido' }]
	};
  constructor(  private dialogRef: MatDialogRef<PensionFormComponent>,
  				@Inject(MAT_DIALOG_DATA) public data:any,
  				private fb: FormBuilder) 
  { 
  	this.Pension = data;
  }

  	ngOnInit() {
  		this._createForms();
  	}

    public accept():void{

    	
    	if (this.pensionForm.invalid) {
	        return;
	    }

    	this.dialogRef.close(this.pensionForm.value);
    	
                
    }

    public cancel():void{
        this.dialogRef.close(false);        
    } 
    
    private _createForms():void{

    	this.pensionForm = this.fb.group({	 
	    	id: new FormControl(null, []),   	
		   	name: new FormControl(null,Validators.required)   
	   	});

	   	if (this.Pension) { this._setForm(); }

	}

	private _setForm():void{
		this.pensionForm.setValue({
   	 		id:this.Pension.id,
   	 		name:this.Pension.name
   	 	});
	}

}
