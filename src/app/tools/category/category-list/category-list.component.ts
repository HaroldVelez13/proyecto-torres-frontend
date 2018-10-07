import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import  { MatSnackBar,
			    MatDialog, 
			    MatDialogConfig
		    } from '@angular/material';

import {ICategory} from '../icategory';
import {CategoryService} from '../category.service';
import { DialogDeleteComponent } from '../../../_helpers-components/dialog-delete/dialog-delete.component';

import { CategoryFormComponent} from '../category-form/category-form.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  Categories:any;
  public slideConfig = {    'centerMode': true,
                            'slidesToShow': 3,
                            'dots': true,
                            responsive: [
                              {
                                'breakpoint': 768,
                                'settings': {
                                  'arrows': false,
                                  'centerMode': true,
                                  'centerPadding': '40px',
                                  'slidesToShow': 2
                                }
                              },
                              {
                                'breakpoint': 480,
                                'settings': {
                                  'arrows': false,
                                  'centerMode': true,
                                  'centerPadding': '40px',
                                  'slidesToShow': 1
                                }
                              }
                            ]
                                                
                        };

  constructor(private categoryService: CategoryService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {    
    this.getAllCategories();
  }

  public getAllCategories(){
		this.categoryService.getAll().subscribe((categories)=>{
      this.Categories = categories;
      console.log(categories);
    });
  }
  
  public deleteCategory(category:ICategory):void{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;        
    dialogConfig.data = { type: 'La Categoria', name: category.name };
    this.dialog.open(DialogDeleteComponent, dialogConfig)
          .afterClosed().subscribe(
            data => { if (data) {
                    this.categoryService.delete(category.id).pipe(first()).subscribe(() => { 
                    this.openSnackBar(category.name);
                    });
                  }
                });  		
  }

  public openFormCategory(category?:ICategory){

		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;    
		if (category) {
			dialogConfig.data = category;
		}else{
			dialogConfig.data = false;
		}
		
		this.dialog.open(CategoryFormComponent, dialogConfig)
			.afterClosed().subscribe(
				formValue => { 
					if (formValue && category) {
						this.updateCategory(formValue);
					}
					if (formValue && !category) {
						this.createCategory(formValue);
					}
			});
  	}

  	private updateCategory(category:ICategory){
		  this.categoryService.update(category).subscribe();

  	}

  	private createCategory(category:ICategory){
  		this.categoryService.create(category).subscribe();
  	}

  private openSnackBar(name) {
    this.snackBar.open('La Herramienta '+name+' Fue Eliminada con exito', null,{
      duration: 1200,
    });
  }

}
