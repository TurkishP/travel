import { Component, OnInit, Inject } from '@angular/core';
import { LocationService } from '../../../core/location.service';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from '@firebase/util';
import { AuthService } from '../../../core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


interface location {
  city: string;
  content: string;
  img?: string;
  name: string;
  neighborhood: string;
  timestamp: any;
  username?: string;
  uid:string;
}

@Component({
  selector: 'detail-popup',
  templateUrl: './detail-popup.component.html',
  styleUrls: ['./detail-popup.component.scss']
})
export class DetailPopupComponent implements OnInit {
  location: Observable<any>;
  UID: string;
  constructor(
    private loca: LocationService,
    private auth: AuthService,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private afAuth: AngularFireAuth,
  ) { 
    this.afAuth.authState.subscribe(user=>{
      if(user) this.UID = user.uid
    })
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation(){
    this.loca.getlocation(this.data.locID).subscribe(results=>{
      this.location = results;
      console.log(this.location)
    })
  }

  like(){
    console.log(this.data.locID, this.UID)
    this.afs.collection('users').doc(this.UID).collection('like').doc(this.data.locID).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(()=>{
      this.snackBar.open("Starred!", "Close", {
        duration: 1300,
      });
   });
  }

}
