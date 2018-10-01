import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IUser } from '../iuser';
import { UserService } from '../user.service';
import * as Constants from '../../_config/constants';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogDeleteComponent } from '../../_helpers-components/dialog-delete/dialog-delete.component';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  api_img = Constants.BASE_URL+'images/proyecto_torres/avatars/';
  regularDistribution = 100 / 4 + '%';
  constructor(private userService: UserService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.loadAllUsers();
  }

    deleteUser(user, index) {
        var fullName = user.name+" "+user.last_name;
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.data = { type: 'Al Usuario', name: fullName };
        this.dialog.open(DialogDeleteComponent, dialogConfig)
              .afterClosed().subscribe(
                data => { if (data) {
                        this.users.splice(index,1);
                        this.userService.delete(user.id).pipe(first()).subscribe(() => { 
                        this.loadAllUsers();

                        this.openSnackBar(fullName);
                        });}
                  });         
      }
 
    loadAllUsers() {
        

        this.userService.getAll()
          .pipe(first())
          .subscribe(users => { 
              this.users = users; 
          },
          error => {
             // console.log(error);
          });
    }
    openSnackBar(name) {
      this.snackBar.open('Usuario '+name+' Eliminado con exito', null,{
        duration: 1200,
      });
    }

}
