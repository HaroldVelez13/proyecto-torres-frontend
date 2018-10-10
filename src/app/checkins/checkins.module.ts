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
import { CheckinListComponent } from './checkin-list/checkin-list.component';
import { CheckinFormComponent } from './checkin-form/checkin-form.component';
import { CheckinDetailComponent } from './checkin-detail/checkin-detail.component';

const checkinRoutes: Routes = [
  {path: '', 			component: CheckinListComponent},
  {path: 'crear', 		component: CheckinFormComponent},
  {path: 'editar/:id', 	component: CheckinFormComponent},
  {path: 'detalle/:id',	component: CheckinDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(checkinRoutes),
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
                  CheckinListComponent, 
                  CheckinFormComponent, 
                  CheckinDetailComponent
                ]
})
export class CheckinsModule { }
