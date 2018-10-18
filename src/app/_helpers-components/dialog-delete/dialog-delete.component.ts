import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {

 type:string;
  name:string;
  constructor(private dialogRef: MatDialogRef<DialogDeleteComponent>,
        		@Inject(MAT_DIALOG_DATA) public data:any) { 
  	this.type = data.type;
  	this.name = data.name;
  }

    public accept() {
        this.dialogRef.close(true);        
    }

    public cancel() {
        this.dialogRef.close(false);        
    }


}
