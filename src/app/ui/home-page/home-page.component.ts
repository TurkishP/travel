import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewLocaPopupComponent } from './new-loca-popup/new-loca-popup.component';
import { LocationService } from '../../core/location.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  locations: Observable<any[]>;

  constructor(    
    public dialog: MatDialog,
    private loca: LocationService,
  ) { }

  ngOnInit() {
    this.getlocations();    
  }


  getlocations(){
    this.locations = this.loca.getLocations();
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

  deleteLocation(id:string){
    this.loca.deleteLocation(id);
  }
}
