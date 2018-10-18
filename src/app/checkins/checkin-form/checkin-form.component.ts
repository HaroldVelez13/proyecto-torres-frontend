import { Component, OnInit, ViewChild  } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as Constants from '../../_config/constants';
import { MatHorizontalStepper, MatStep } from '@angular/material';
import { MatSnackBar,
					MatDialog, 
					MatDialogConfig } from '@angular/material';
import { ICheckin } from '../icheckin';
import { CheckinService } from '../checkin.service';

import {ToolsService} from '../../tools/tools/tools.service';
import {ITool} from '../../tools/tools/itool';
import { ToolTotalComponent } from '../tool-total/tool-total.component';	


@Component({
  selector: 'app-checkin-form',
  templateUrl: './checkin-form.component.html',
  styleUrls: ['./checkin-form.component.css']
})
export class CheckinFormComponent implements OnInit {
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;
	checkinForm: FormGroup; 
	loading:boolean = false;
	checkinId:number;
	stepFormCompleted:boolean = false;
	checkin:ICheckin;
	tools:ITool[];
  selectedOptions = [];
  src_img:string  = Constants.BASE_URL+'images/proyecto_torres/checkins/';
	init_image:any = this.src_img+'default.png';
  
  validation_messages =
    {
    'total':[{ type: 'minLength', message: 'Valor minimo' }]
    }

  constructor(private checkinService : CheckinService,
              private toolsService : ToolsService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
							private snackBar: MatSnackBar,
							private dialog: MatDialog,) { }

  ngOnInit() {
    this.createForms();
  	this.getParam();
  }

  private getParam(){
    if ( this.activatedRoute.snapshot.paramMap.get('id') ) {
      this.checkinId =  parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.getCheckin(this.checkinId);
    }	  	
  }

  private createForms():void{
    this.checkinForm = this.fb.group({
      id: new FormControl(null, []),
      date: new FormControl(null, []),
      total: new FormControl(null, [Validators.minLength(3)]),
      url_image: new FormControl(null, []),
      
    });
  }

  private getCheckin(id:number){
		this.checkinService.getById(id).subscribe((data)=>{
			this.init_image = this.src_img+data.checkin.url_image;
			this.checkin = data.checkin;			
			this.getTools(data.tools);
			this.setForm(data.checkin);			
			this.stepFormCompleted=true;			
			
		});

  }
  
	private setForm(checkin){
		this.checkinForm.setValue({
				id:					checkin.id,
				date:	      checkin.date,
				total:	    checkin.total,
				url_image:	checkin.url_image

			});
  }
  
  private getTools(selectedTool?){
		this.toolsService.getAll().subscribe((tools:ITool[])=>{
			this.tools = tools;			 
			this.setSelectedTools(selectedTool);
			  		
			
		});
  }
  
  private setSelectedTools(tools){
		if (tools) {
			var selected: Array<any> = [ ]; 
			Object.keys(tools).forEach(key => {
				let user = tools[key].id;
				selected.push(user);				
			});			
			this.selectedOptions = selected;
		}

  }
  
  public formAction(form:any){
		
		if (this.checkinForm.invalid) {
			return
		}

		if (!this.checkinId) {
			this.createCheckin(form);
		}
		if (this.checkinId) {
			this.updateCheckin(form);
		}		

  }
  
  private updateCheckin(formData){
    this.stepFormCompleted=true;
		this.checkinService.update(formData).subscribe((checkin:ICheckin)=>{
			this.checkin = checkin;
			this.getTools();
			this.next();
		});	
	}	

	private createCheckin(formData){

		this.stepFormCompleted=true;
		this.checkinService.create(formData).subscribe((checkin:ICheckin)=>{
			this.checkin = checkin;
			this.getTools();
			this.next();
		});		

  }

  public addTools(){
		var id;
		if(this.checkinId){
			id=this.checkinId;
		}
		if(this.checkin){
			id=this.checkin.id;
		}
		//this.checkinService.addTool(id, this.selectedOptions ).subscribe((data)=>{
		//});

  }
  
  private next(){
		this.stepper.next();
	}
	public onSelection(event:any){
		this.selectedOptions = event;
	}

	getValue(tool){
		let index = tool.id;
		if(this.selectedOptions[index]){
			return this.openFormTool(tool);
		}
		else{
			return alert('nothing');
			//this.deleteTool(tool);
		}	
		
	}
  
  	/**
	* this is used to trigger the input
	*/ 
	public openInput(){ 
    // your can use ElementRef for this later
    document.getElementById("factura").click();
    return false;	    
  }  
    
  public fileChange(file:any) {
    if (file.target.files && file.target.files[0]) {

      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);

      reader.onload = (event:any) => {
        this.checkinForm.get('url_image').setValue( reader.result);
        this.init_image = reader.result;	       
      }		  
      }
	}
	
	public openFormTool(tool:any){
		
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false; 
		dialogConfig.data = {checkin:this.checkin, tool:tool};
		dialogConfig.width= '30em',		
		
	
		this.dialog.open(ToolTotalComponent, dialogConfig)
			.afterClosed().subscribe(
				formValue => { 
					if (formValue ) {
						var id, tool_id, tool_quantity;
						id = this.checkin.id;
						tool_id = formValue.tool_id;
						tool_quantity = formValue.tool_quantity; 
						this.checkinService.addTool(id, tool_id, tool_quantity).subscribe();						
					}
					else{
						
						var options=[];
						this.selectedOptions.forEach((option)=>{
							if(option !== tool.id){
								options.push(option);
							}
						});
						
						this.selectedOptions = options;
															
					}
				}
			);
	}

	public deleteTool(tool:any){
		var tool_actual, id, tool_id, tool_quantity;
		this.checkin.pivot.forEach((t)=>{
			if(tool.id === t.tool_id){
				tool_actual = t;
			}
		});
		id = this.checkin.id;
		tool_id = tool_actual.tool_id;
		tool_quantity = tool_actual.tool_quantity;
		this.checkinService.leastTool(id, tool_id, tool_quantity).subscribe(
			(data)=>console.log(data)
		);

	}


}
