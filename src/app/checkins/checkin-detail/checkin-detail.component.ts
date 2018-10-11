import { Component, OnInit } from '@angular/core';
import * as Constants from '../../_config/constants';
import { ActivatedRoute } from '@angular/router';
import { ICheckin } from '../icheckin';
import { CheckinService } from '../checkin.service';
import {ITool} from '../../tools/tools/itool';

@Component({
  selector: 'app-checkin-detail',
  templateUrl: './checkin-detail.component.html',
  styleUrls: ['./checkin-detail.component.css']
})
export class CheckinDetailComponent implements OnInit {
  checkinId:number;
	checkin:ICheckin;
  tools:ITool[];
  api_img:string  = Constants.BASE_URL+'images/proyecto_torres/checkins/';
  constructor(private checkinService : CheckinService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.checkinId =  parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.checkinService.getById(this.checkinId).subscribe((data)=>{
      this.checkin = data.checkin;
      this.tools = data.tools;
    });
  }

}
