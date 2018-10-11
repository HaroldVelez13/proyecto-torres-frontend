import { Component, OnInit, ViewChild  } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as Constants from '../../_config/constants';
import { MatHorizontalStepper, MatStep } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ICheckin } from '../icheckin';
import { CheckinService } from '../checkin.service';

import {ToolsService} from '../../tools/tools/tools.service';
import {ITool} from '../../tools/tools/itool';


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
              private snackBar: MatSnackBar) { }

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


}
