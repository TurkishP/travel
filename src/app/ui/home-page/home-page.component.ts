import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewLocaPopupComponent } from './new-loca-popup/new-loca-popup.component';
import { LocationService } from '../../core/location.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { DetailPopupComponent } from './detail-popup/detail-popup.component';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  locations: Observable<any[]>;
  UID: string;
  constructor(    
    public dialog: MatDialog,
    private loca: LocationService,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,

  ) { }

  ngOnInit() {
    this.getlocations();    

    this.afAuth.authState.subscribe(user=>{
      if(user) this.UID = user.uid
    })
  }


  getlocations(){
    this.locations = this.loca.getLocations();
  }

  detailPopup(locId) {
    const dialogRef = this.dialog.open(DetailPopupComponent, {
      data:{locID:locId},
      height: '90%',
      width: '90%'
    });
  }

  deleteLocation(id:string){
    this.loca.deleteLocation(id);
  }

  like(location_id: string){
    console.log(location_id, this.UID)
    this.afs.collection('users').doc(this.UID).collection('like').doc(location_id).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
}
