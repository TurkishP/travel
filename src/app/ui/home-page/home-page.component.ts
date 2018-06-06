import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewLocaPopupComponent } from './new-loca-popup/new-loca-popup.component';
import { LocationService } from '../../core/location.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';


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

    this.afAuth.authState.subscribe(user => {
      if (user) this.UID = user.uid
    })
    /// this.gethashtag();
    this.add();
  }

  add() {
    console.log("h8i");

    var content = document.getElementById('contents').innerHTML;
    var splitedArray = content.split(' ');
    var linkedContent = '';
    console.log("테그테그");
    for (var word in splitedArray) {
      word = splitedArray[word];
      if (word.indexOf('#') == 0) {
        word = '<a href=\'링크\'>' + word + '</a>';
        console.log("테그테그");
      }
      linkedContent += word + ' ';
    }
    document.getElementById('contents').innerHTML = linkedContent;

  }

  getlocations() {
    this.locations = this.loca.getLocations();
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewLocaPopupComponent, {
      data: {},
      height: '570px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  deleteLocation(id: string) {
    this.loca.deleteLocation(id);
  }

  like(location_id: string) {
    console.log(location_id, this.UID)
    this.afs.collection('users').doc(this.UID).collection('like').doc(location_id).set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
}
