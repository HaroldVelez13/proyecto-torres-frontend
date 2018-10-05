import { Component, OnInit} from '@angular/core';
import * as Constants  from '../_config/constants';
import { CarouselService } from '../carousels/carousel.service';
import { ICarousel } from '../carousels/icarousel';



@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.css']
})
export class CarouselHomeComponent implements OnInit {

  private url_image:string;
  public instances:any;
  public Carousels:[ICarousel];
  public imageSources: Array<string>;

  constructor(private carouselService:CarouselService) { 

    this.url_image = Constants.BASE_URL+'images/proyecto_torres/slides/';
    this.imageSources = [''];
  }

  ngOnInit() { 
    this.getCarousels();

  }

  
  getCarousels():void{
    this.carouselService.getHome()
    .subscribe(             
        data => {
          this.Carousels = data;
          this.getImages(this.Carousels);
        },
        error => console.log("Error :: " + error)
      ); 

  }

  getImages(carousels:ICarousel[]):void{
    
    var images: Array<string> = [ ]; 
    Object.keys(carousels).forEach(key => {
      let image = carousels[key].url_slide;
      images.push(this.url_image+image);
    });
    
    this.imageSources = images;
  }


}
