import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { 
  MatButtonModule, 
  MatIconModule,  
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatStepperModule,
  MatCardModule,  
  MatProgressBarModule
  
} from '@angular/material';

import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobFormComponent } from './job-form/job-form.component';

const jobsRoutes: Routes = [
  {path: '', 			component: JobListComponent},
  {path: 'crear', 		component: JobFormComponent},
  {path: 'editar/:id', 	component: JobFormComponent},
  {path: 'detalle/:id',	component: JobDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forChild(jobsRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
  	MatIconModule,  
  	MatFormFieldModule,
  	MatInputModule,
  	MatDialogModule,
  	MatSnackBarModule,
  	MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
  	MatListModule,
    MatStepperModule,
    MatCardModule,
    MatProgressBarModule,

  ],
  declarations: [
  	JobListComponent, 
  	JobDetailComponent, 
  	JobFormComponent
  ]
})
export class JobsModule { }
