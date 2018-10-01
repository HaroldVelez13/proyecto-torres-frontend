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
import { PensionListComponent } from './pension-list/pension-list.component';
import { PensionFormComponent } from './pension-form/pension-form.component';


const pensionsRoutes: Routes = [
  {path: '', component: PensionListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(pensionsRoutes),
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
  declarations: [PensionListComponent, PensionFormComponent],
  entryComponents: [PensionFormComponent]
})
export class PensionsModule { }
