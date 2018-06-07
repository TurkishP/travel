import { Component, OnInit , Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocationService } from '../../../core/location.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'loc-info-popup',
  templateUrl: './loc-info-popup.component.html',
  styleUrls: ['./loc-info-popup.component.scss']
})
export class LocInfoPopupComponent implements OnInit {

  location: Observable<any>;
  UID : string;
  userdata: any;
  comments: Observable<any[]>;

  constructor(
  @Inject (MAT_DIALOG_DATA)public data:any,
  private afs: AngularFirestore,
  private loca: LocationService,
  private afAuth: AngularFireAuth

) {
  this.afAuth.authState.subscribe(user=>{
    if(user) {this.UID = user.uid}
  })


 }

  ngOnInit() {
    this.getLocation();
    this.getComments();
  }

  getLocation(){
    this.loca.getlocation(this.data.locID).subscribe(result=>{
      this.location = result;
    })
  }

  newComment(content: string){
   
    this.afs.collection('users').doc(this.UID).snapshotChanges().subscribe(result=>{
       this.userdata = result.payload.data();
      //  console.log(result.payload.data())
      //  console.log( this.userdata.photoURL)
      this.loca.newComment(content, this.data.locID, this.UID, this.userdata.photoURL);
    });
  }

  getComments(){
      this.comments=this.loca.getComments(this.data.locID);
  }
  //comments 가져오는 함수 구현해야함
}
