import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { 
  MatButtonModule,
  MatCardModule,
  MatProgressBarModule, 
  MatIconModule,  
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,  
  MatListModule,
  MatSlideToggleModule
} from '@angular/material';

import { CarouselsListComponent } from './carousels-list/carousels-list.component';
import { CarouselsFormComponent } from './carousels-form/carousels-form.component';

const carouselsRoutes: Routes = [
  {path: '', component: CarouselsListComponent},
  {path: 'crear', component: CarouselsFormComponent},
  {path: 'editar/:id', component: CarouselsFormComponent},
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(carouselsRoutes),

    FlexLayoutModule,
   	MatButtonModule,
   	MatCardModule,
   	MatProgressBarModule, 
  	MatIconModule,  
  	MatFormFieldModule,
  	MatInputModule,
  	MatDialogModule,
  	MatSnackBarModule,
  	MatTooltipModule,
    MatListModule,
  	MatSlideToggleModule
  ],
  declarations: [
  	CarouselsListComponent,
  	CarouselsFormComponent
    ]

})
export class CarouselsModule { }
