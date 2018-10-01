import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import { 
  MatButtonModule, 
  MatIconModule,  
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatTableModule
} from '@angular/material';

import { EpsListComponent } from './eps-list/eps-list.component';
import { EpsFormComponent } from './eps-form/eps-form.component';


const epesRoutes: Routes = [
  {path: '', component: EpsListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(epesRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
	  MatButtonModule, 
  	MatIconModule,  
  	MatFormFieldModule,
  	MatInputModule,
  	MatDialogModule,
  	MatSnackBarModule,
  	MatTooltipModule,
  	MatTableModule
  ],
  declarations: [EpsListComponent, EpsFormComponent],
  entryComponents: [EpsFormComponent]
})

export class EpsModule { }
