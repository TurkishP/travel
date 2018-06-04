import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewLocaPopupComponent } from './new-loca-popup/new-loca-popup.component';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(    
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }


  openDialog() {
    const dialogRef = this.dialog.open(NewLocaPopupComponent, {
      data:{},
      height: '90%',
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
