import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ICarousel } from '../icarousel';
import { CarouselService } from '../carousel.service';
import * as Constants from '../../_config/constants';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogDeleteComponent } from '../../_helpers-components/dialog-delete/dialog-delete.component';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-carousels-list',
  templateUrl: './carousels-list.component.html',
  styleUrls: ['./carousels-list.component.css']
})
export class CarouselsListComponent implements OnInit {
  slides: ICarousel[] = [];
  api_img = Constants.BASE_URL+'images/proyecto_torres/slides/';
  headersButtons=[{  icon:'add_photo_alternate',
                     route:'/evidencias/crear',
                     title: 'Crear Evidencia'
                 }];

  constructor(private carouselService: CarouselService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  	this.loadAllSlides();
  }

	deleteSlide(slide, index) {
		var name = slide.name||slide.id;
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.data = { type: 'La Evidencia', name: name };
		this.dialog.open(DialogDeleteComponent, dialogConfig)
		      .afterClosed().subscribe(
		        data => { if (data) {
		                this.slides.splice(index,1);
		                this.carouselService.delete(slide.id).pipe(first()).subscribe(() => { 
		                this.loadAllSlides();
		                this.openSnackBar(name);
		                });}
		          });         
	}
 
    loadAllSlides() {        

        this.carouselService.getAll()
          .pipe(first())
          .subscribe(slides => { 
              this.slides = slides; 
          },
          error => {
             // console.log(error);
          });
    }
    openSnackBar(name) {
      this.snackBar.open('La evidencia '+name+' fue Eliminada con exito', null,{
        duration: 1200,
      });
    }

}
