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
  MatSelectModule,
  MatListModule,
  MatCardModule,
  MatBadgeModule,
  MatExpansionModule,
  MatTableModule,  
} from '@angular/material';
import { SlickModule } from 'ngx-slick';
import { ToolsLandingComponent } from './tools-landing/tools-landing.component';
import { ToolsListComponent } from './tools/tools-list/tools-list.component';
import { ToolsFormComponent } from './tools/tools-form/tools-form.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
const toolsRoute: Routes = [
  {path: '', component: ToolsLandingComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(toolsRoute),
    FormsModule,
    ReactiveFormsModule,
    SlickModule.forRoot(),    
  	MatButtonModule, 
  	MatIconModule,  
  	MatFormFieldModule,
  	MatInputModule,
  	MatDialogModule,
  	MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTableModule
  ],
  declarations: [ ToolsLandingComponent, 
                  ToolsListComponent, 
                  ToolsFormComponent, 
                  CategoryListComponent, 
                  CategoryFormComponent
                ],
  entryComponents: [ToolsFormComponent,CategoryFormComponent]
})
export class ToolsModule { }
