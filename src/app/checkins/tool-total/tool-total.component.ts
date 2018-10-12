import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ICheckin } from '../icheckin';
import { ITool } from '../../tools/tools/itool';

@Component({
  selector: 'app-tool-total',
  templateUrl: './tool-total.component.html',
  styleUrls: ['./tool-total.component.css']
})
export class ToolTotalComponent implements OnInit{
  
  checkinForm:FormGroup;
	Checkin:ICheckin;
  tool:any;
  validation_messages = {};
  max:number;
 

  
  constructor(private dialogRef: MatDialogRef<ToolTotalComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private fb: FormBuilder) 
  {
    this.Checkin = data.checkin;
    this.tool = data.tool;
   
  }

  ngOnInit() {
    this._createForms();
    
  }

  public accept(dataForm) {
    if(!this.checkinForm.valid){
        return
    }
    this.dialogRef.close(dataForm);        
  }
    
  public cancel() {
      this.dialogRef.close(false);        
  }

  private _createForms(){
    this.max = this.tool.quantity;
    
    this.validation_messages = {		
      'tool_quantity': [ { type: 'required', message: 'El total es requerido' },
                      { type: 'min', message: 'Minimo de 1' }
                      //({ type: 'max', message: 'El maximo es '+this.max }
                    ]
    };
    this.checkinForm = this.fb.group({	 
      tool_id: new FormControl(null, []),   	
      tool_quantity: new FormControl(null,Validators.compose([
        Validators.min(1),
       // Validators.max(this.max),
        Validators.required
        ]))   
     });



     this.checkinForm.setValue({
      tool_id:this.tool.id,
      tool_quantity:null
    });

  }

}
