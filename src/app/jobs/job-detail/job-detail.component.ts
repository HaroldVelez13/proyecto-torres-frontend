import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJob } from '../ijob';
import { JobService } from '../job.service';
import {IUser} from '../../users/iuser';


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
	jobId:number;
	job:IJob;
	users:IUser[];

  constructor(private jobService : JobService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
	 this.jobId =  parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
	 this.jobService.getById(this.jobId).subscribe((data)=>{
	 	this.job = data.job;
	 	this.users = data.users;
	 });	  		
  }

}
