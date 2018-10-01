import { Component, OnInit,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ParentErrorStateMatcher, PasswordValidator } from '../password-validator';


@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {

passwordForm:FormGroup;
validation_messages = {		
	'password': [	
					{ type: 'minlength', message: 'La contraseña debe ser de 5 caracteres minimo' },
					{ type: 'required', message: 'La contraseña es Requerido' }
				],
	'password_confirm': [
							{ type: 'minlength', message: 'La contraseña debe ser de 5 caracteres minimo' },
  							{ type: 'areEqual', message: 'Las Contraseñas no coincide' },
  							{ type: 'required', message: 'La confirmacion es Requerido' }
  						]
};
parentErrorStateMatcher = new ParentErrorStateMatcher();
  constructor(	private dialogRef: MatDialogRef<AdminChangePasswordComponent>
        	)
  {}
	 ngOnInit() {
    this.createForms();
  }


    accept() {

    	
    	if (this.passwordForm.invalid) {
	        return;
	    }

    	this.dialogRef.close(this.passwordForm.value);
    	
                
    }

    cancel() {
        this.dialogRef.close(false);        
    } 
    
    createForms(){
    	this.passwordForm = new FormGroup({
	    	
   	password: new FormControl(null, Validators.compose([
        	Validators.minLength(5),
        	Validators.required
    ])),
   	password_confirm: new FormControl(null, Validators.compose([
   		Validators.minLength(5),
   		Validators.required
   		]))
	}, 	(formGroup: FormGroup) => {
		 return PasswordValidator.areEqual(formGroup);						    	
    	});
    }    


}
