import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ICategory } from '../icategory';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm:FormGroup;
  Category:ICategory;
  validation_messages ={
    'name': [ 
              { type: 'required', message: 'El nombre es un campo Requerido' },
              { type: 'minLength', message: 'El Nombre debe tener al menos 3 letras' },
            ],
    'material': [{ type: 'minLength', message: 'El nombre del Material debe tener al menos 3 letras' }],
    'description': [{ type: 'minLength', message: 'La Descripcion debe tener al menos 10 letras' }],
    'min_stock': [{ type: 'minLength', message: 'Minimo Stock es de 1' }],
  }

  constructor(private dialogRef: MatDialogRef<CategoryFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private fb: FormBuilder)
  { 
    this.Category = data.category;
  
  }

  ngOnInit() {
    this._createForms();
  }

  public accept():void{    	
    if (this.categoryForm.invalid) {
        return;
    }
    this.dialogRef.close(this.categoryForm.value);   	
  }
  
  public cancel():void{
      this.dialogRef.close(false);        
  } 
      
  private _createForms():void{  
    this.categoryForm = this.fb.group({	 
      id: new FormControl(null, []),   	
      name: new FormControl(null,Validators.compose([
                                Validators.required,
                                Validators.minLength(3)
                            ])),
      material: new FormControl(null,Validators.minLength(3)),
      description: new FormControl(null,Validators.minLength(10)),
      min_stock: new FormControl(null,Validators.minLength(1))                
    });
  
    if (this.Category) { 
      this._setForm(); 
    }	   	
  
  
  }
  
  private _setForm():void{
    this.categoryForm.setValue({
      id:this.Category.id,
      name:this.Category.name,
      material:this.Category.material,
      description:this.Category.description,
      min_stock:this.Category.min_stock,
    });
  }

}
