import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import * as Constants from '../../_config/constants';
import { ICheckin } from '../icheckin';
import { CheckinService } from '../checkin.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogDeleteComponent } from '../../_helpers-components/dialog-delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-checkin-list',
  templateUrl: './checkin-list.component.html',
  styleUrls: ['./checkin-list.component.css']
})
export class CheckinListComponent implements OnInit {
  
  Checkins: ICheckin[] = [];
  api_img = Constants.BASE_URL+'images/proyecto_torres/checkins/';
  constructor(private checkinService: CheckinService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

    ngOnInit() {
      this.loadAllCheckins();
    }

    public loadAllCheckins(){
      this.checkinService.getAll()
        .pipe(first())
        .subscribe(checkins => { 
          this.Checkins = checkins; 
        },
        error => {
        // console.log(error);
      });

    }

      public openSnackBar(date) {
      this.snackBar.open('El factura del dia '+date+', fue Eliminada con exito', null,{
        duration: 1200,
      });
    }
    public deleteCheckin(checkin, index) {
      var date = checkin.date;
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.data = { type: 'La factura de la fecha', name: date };
      this.dialog.open(DialogDeleteComponent, dialogConfig)
            .afterClosed().subscribe(
              data => { if (data) {
                      this.Checkins.splice(index,1);
                      this.checkinService.delete(checkin.id).pipe(first()).subscribe(() => { 
                      this.loadAllCheckins();
                      this.openSnackBar(date);
                      });}
                });         
    }

}
