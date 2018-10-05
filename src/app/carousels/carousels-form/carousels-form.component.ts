import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../carousel.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ICarousel } from '../icarousel';
import {ActivatedRoute,Router} from '@angular/router';
import * as Constants from '../../_config/constants';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-carousels-form',
  templateUrl: './carousels-form.component.html',
  styleUrls: ['./carousels-form.component.css']
})
export class CarouselsFormComponent implements OnInit {

	checked = false;
	slideForm: FormGroup; 
	loading:boolean = false;
	slide: boolean;
	slideId:number;
	
	src_img:string  = Constants.BASE_URL+'images/proyecto_torres/slides/';
	init_image:any = this.src_img+'default.png';
	

	validation_messages ={
		'name':[
			{ type: 'minLength', message: 'El Nombre debe tener al menos 5 letras' }
		],
		'description':[
			{ type: 'minLength', message: 'La descripcion debe tener al menos 10 letras' }
		]
	}

  constructor(private carouselService : CarouselService,
              private fb: FormBuilder,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) 
  	{ 
	  
	}

  ngOnInit() {
  	this.createForms();
  	this.getParam();
  }

  private getParam(){
  	if ( this.activatedRoute.snapshot.paramMap.get('id') ) {
  		this.slideId =  parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  		this.getSlide(this.slideId);
  	}
  	
  }


    private createForms():void{
	    this.slideForm = this.fb.group({
	    	id: new FormControl(null, []),
	    	url_slide: new FormControl(null, []),
		    name: new FormControl(null, [Validators.minLength(5)]),
		    description: new FormControl(null, [Validators.minLength(10)])
		    
	    });
	}

	private getSlide(id:number){
  		this.carouselService.getById(id).subscribe((slide:any)=>{
  			this.init_image = this.src_img+slide.url_slide;
  			if (slide.state==='active') {
  				this.checked=true;
  			}
  			if (slide.state==='inactive') {
  				this.checked=false;
  			}
  			this.slideForm.setValue({
  				id:slide.id,
  				name:slide.name,
  				description:slide.description,
  				url_slide: slide.url_slide
  		
  			});  console.log(this.checked);			
  		});
  	}

	public toggleChange(event: any){
		this.checked = event.checked;	
	}

	/**
	* this is used to trigger the input
	*/ 
	public openInput(){ 
	    // your can use ElementRef for this later
	    document.getElementById("evidencia").click();
	    return false;	    
	}  
	  
	public fileChange(file:any) {
		if (file.target.files && file.target.files[0]) {

		  var reader = new FileReader();
		  reader.readAsDataURL(file.target.files[0]);

		  reader.onload = (event:any) => {
		    this.slideForm.get('url_slide').setValue( reader.result);
		    this.init_image = reader.result;	       
		  }		  
	    }
	}

	public formAction(form){

		if (this.slideForm.invalid) {
			return
		}
		if (this.checked) {
			form.state="active";
		}
		if (!this.checked) {
			form.state="inactive";
		}

		if (!this.slideId) {
			this.createSlide(form);
		}
		if (this.slideId) {
			this.updateSlide(this.slideId, form);
		}
		

	}

	private createSlide(carouselForm){		
		this.loading = true;
		this.carouselService.create(carouselForm)
	       .pipe(first())
	        .subscribe(
	            slide => {
	                this.loading = false;
	                this.actionSuccess(slide);                
	                
	            },
	            error => {
	                this.loading = false;

	            });

	}

	private updateSlide(id:number, carouselForm){
		this.loading = true;
		this.carouselService.update(id,carouselForm).pipe(first())
	        .subscribe(
	            slide => {
	                this.loading = false;
	                this.actionSuccess(slide);               
	                
	            },
	            error => {
	                this.loading = false;

	            });
	}

	private actionSuccess(carousel:ICarousel){		
		var name = carousel.name||carousel.id;
		var exito = 'Creada con exito';
		if (this.slideId) {
			exito = 'Editada con exito';
		}		

		this.snackBar.open('Evidencia '+name+' '+exito, null,{
	        duration: 1500,

	    }).afterDismissed().subscribe(() => {		  	
			this.router.navigate(['/evidencias']);			
		});		

	}
	

}
