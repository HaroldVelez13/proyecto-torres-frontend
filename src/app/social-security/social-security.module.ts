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
  MatTableModule,
  MatTabsModule
  
} from '@angular/material';
import { PensionListComponent } from './pensions/pension-list/pension-list.component';
import { PensionFormComponent } from './pensions/pension-form/pension-form.component';
import { EpsListComponent } from './eps/eps-list/eps-list.component';
import { EpsFormComponent } from './eps/eps-form/eps-form.component';
import { SocialSecurityComponent } from './social-security/social-security.component';

const socialSecurityRoute: Routes = [
  {path: '', component: SocialSecurityComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(socialSecurityRoute),
    FormsModule,
    ReactiveFormsModule,
    
  	MatButtonModule, 
  	MatIconModule,  
  	MatFormFieldModule,
  	MatInputModule,
  	MatDialogModule,
  	MatSnackBarModule,
  	MatTooltipModule,
    MatTableModule,
    MatTabsModule
  ],
  declarations: [ PensionListComponent, 
                  PensionFormComponent,
                  EpsListComponent, 
                  EpsFormComponent, 
                  SocialSecurityComponent
                ],
  entryComponents: [PensionFormComponent,EpsFormComponent]
})
export class SocialSecurityModule { }
