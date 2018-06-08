import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { NewLocaPopupComponent } from './new-loca-popup/new-loca-popup.component';
import {  LocInfoPopupComponent } from './loc-info-popup/loc-info-popup.component';
import { LocationService } from '../../core/location.service';

import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { LocForPlanComponent } from './loc-for-plan/loc-for-plan.component';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  locations: Observable<any[]>;
  tag:Observable<any[]>
  UID: string;
  constructor(
    public dialog: MatDialog,
    private loca: LocationService,
   
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.getlocations();
    //this.getTags(this.locations.id);
    this.afAuth.authState.subscribe(user => {
      if (user) this.UID = user.uid
    })

  }


  keepForPlanning(location_id: string){
    const dialogRef = this.dialog.open(LocForPlanComponent, {
      data: {location_id:location_id},
      height: '60%',
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`info result: ${result}`);
    });
  }

  getlocations() {
    this.locations = this.loca.getLocations();
    this.locations.subscribe(results=>{
      console.log(results)
    });

  }

  getTags(id:string){
    this.tag=this.loca.getTags(id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewLocaPopupComponent, {
      data: {},
      height: '570px',
      width: '600px'
    });
  }
  
  detailPopup(locId) {
    const dialogRef = this.dialog.open(LocInfoPopupComponent, {
      data:{locID:locId},
      height: '90%',
      width: '90%'
    });
  }

  deleteLocation(id: string) {
    this.loca.deleteLocation(id);
  }

  like(location_id: string) {
    console.log(location_id, this.UID)
    this.afs.collection('users').doc(this.UID).collection('like').doc(location_id).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(()=>{
      this.snackBar.open("Starred!", "Close", {
        duration: 1300,
      });
   });
  }
}
