import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { 
  MatButtonModule, 
  MatIconModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCardModule,
  MatProgressBarModule,
  MatListModule,
  MatExpansionModule,
  MatDialogModule,
  MatSnackBarModule, 
  MatTooltipModule

  
} from '@angular/material';

import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';

const usersRoutes: Routes = [
  {path: '',             component: UserListComponent},
  {path: 'crear',        component: UserCreateComponent},  
  {path: 'editar/:id',   component: UserEditComponent},
  {path: 'detalle/:id',  component: UserDetailComponent}
];

@NgModule({
  imports: [
    
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(usersRoutes), 
    
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,   
    MatTooltipModule  
  ],
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent,
    AdminChangePasswordComponent
    
  ],
  entryComponents: [AdminChangePasswordComponent]

})

export class UsersModule {

}
