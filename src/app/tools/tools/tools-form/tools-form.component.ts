import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ITool } from '../itool';
import { ICategory } from '../../category/icategory';

@Component({
  selector: 'app-tools-form',
  templateUrl: './tools-form.component.html',
  styleUrls: ['./tools-form.component.css']
})
export class ToolsFormComponent implements OnInit {
  

  toolForm:FormGroup;
  Tool:ITool;
  Categories:ICategory;
  States = [{value: 'activo', viewValue: 'Activa'},
            {value: 'inactivo', viewValue: 'Inactiva'}
          ];
  Types = [{value: 'herramienta', viewValue: 'Herramienta'},
            {value: 'insumo', viewValue: 'Insumo'}
          ];
  validation_messages ={
    'barcode': [{ type: 'minLength', message: 'Minimo 8 Numeros' },],
    'name': [{ type: 'minLength', message: 'Minimo 5 Numeros' },]
  }

  constructor(private dialogRef: MatDialogRef<ToolsFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private fb: FormBuilder) 
  { 
    this.Tool       = data.tool;
    this.Categories = data.categories;
  }

  ngOnInit() {
    this._createForms();
  }

  public accept():void{    	
    if (this.toolForm.invalid) {
        return;
    }
    this.dialogRef.close(this.toolForm.value);   	
  }
  
  public cancel():void{
      this.dialogRef.close(false);        
  } 
      
  private _createForms():void{  

    this.toolForm = this.fb.group({	 
      id:       new FormControl(null, []),   	
      barcode:  new FormControl(null,Validators.minLength(8)),
      name:     new FormControl(null,Validators.minLength(5)),
      state:    new FormControl(null,[]),
      type:     new FormControl(null,[]),
      category: new FormControl(null,[])
    });
  
    if (this.Tool) { 
      var category_id:number;
      Object.keys(this.Categories).forEach(index => {
        let categoryName:string = JSON.stringify(this.Tool.category.name).toLowerCase();
        let category:string     = JSON.stringify(this.Categories[index].name).toLowerCase();
        if(category===categoryName){
          return category_id=this.Categories[index].id ;
        } 
       
      });
      
      this._setForm(category_id);
    }	   	
  
  
  }
  
  private _setForm(category_id:number):void{
    
    this.toolForm.setValue({
      id:       this.Tool.id,
      barcode:  this.Tool.barcode,
      name:     this.Tool.name,
      state:    this.Tool.state,
      type:     this.Tool.type,
      category: category_id
    });
  }
}
