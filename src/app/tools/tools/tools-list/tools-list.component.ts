import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import  { MatSnackBar,
			    MatDialog, 
			    MatDialogConfig
		    } from '@angular/material';

import {ITool} from '../itool';
import {ToolsService} from '../tools.service';
import { DialogDeleteComponent } from '../../../_helpers-components/dialog-delete/dialog-delete.component';

import { ToolsFormComponent} from '../tools-form/tools-form.component';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.css']
})
export class ToolsListComponent implements OnInit {

  displayedColumns: string[] = ['index','name', 'barcode', 'state', 'type'];	
  Tools = new ToolDataSource(this.toolService); 
    
  constructor(  private toolService: ToolsService,
                private dialog: MatDialog,
                public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllTools();
  }

  public getAllTools(){
		this.toolService.getAll().subscribe();
  }
  
  public deleteTool(tool:ITool):void{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;        
    dialogConfig.data = { type: 'La Herramienta', name: tool.name };
    this.dialog.open(DialogDeleteComponent, dialogConfig)
          .afterClosed().subscribe(
            data => { if (data) {
                    this.toolService.delete(tool.id).pipe(first()).subscribe(() => { 
                    this.openSnackBar(tool.name);
                    });
                  }
                });  		
  }

  public openFormTool(tool?:ITool){

		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;    
		if (tool) {
			dialogConfig.data = tool;
		}else{
			dialogConfig.data = false;
		}
		
		this.dialog.open(ToolsFormComponent, dialogConfig)
			.afterClosed().subscribe(
				formValue => { 
					if (formValue && tool) {
						this.updateTool(formValue);
					}
					if (formValue && !tool) {
						this.createTool(formValue);
					}
			});
  	}

  	private updateTool(tool:ITool){
		  this.toolService.update(tool).subscribe();

  	}

  	private createTool(tool:ITool){
  		this.toolService.create(tool).subscribe();
  	}

  private openSnackBar(name) {
    this.snackBar.open('La Herramienta '+name+' Fue Eliminada con exito', null,{
      duration: 1200,
    });
  }



}

export class ToolDataSource extends DataSource<[ITool]> {

  constructor(private toolService: ToolsService) {
    super(); 	

  }
  connect(): Observable<any> { 
      	return this.toolService.getTools();      
  }
  disconnect() {}
}
