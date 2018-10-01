import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import * as Constants from '../../_config/constants'; 
import { IUser } from '../iuser';
import { UserService } from '../user.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogDeleteComponent } from '../../_helpers-components/dialog-delete/dialog-delete.component';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: IUser;
  avatar = Constants.BASE_URL+'images/proyecto_torres/avatars/';
  eps:[{}];
  pensions:[{}];
  constructor(private userService: UserService,
  			      private activatedRoute: ActivatedRoute,
              private router: Router,

              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  	const userId =  parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
	    this.userService.getById(userId).subscribe((data: any) => {
        this.avatar+=data.user.img_url;
        this.eps = data.eps;
        this.pensions = data.pensions;
	      this.user = data.user;
    });
  }

  deleteUser(user, index) {
    var fullName = user.name+" "+user.last_name;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.data = { type: 'Al Usuario', name: fullName };
    this.dialog.open(DialogDeleteComponent, dialogConfig)
          .afterClosed().subscribe(
            data => { if (data) {
                    this.userService.delete(user.id).pipe(first()).subscribe(() => { 
                      this.router.navigate(['/empleados']);
                    });}
              });         
  }

}
