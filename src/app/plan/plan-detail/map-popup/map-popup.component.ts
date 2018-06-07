import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { PlanService } from '../../../core/plan.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap, finalize } from 'rxjs/operators';
declare const naver: any;

@Component({
  selector: 'map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.scss']
})
export class MapPopupComponent implements OnInit {
  map:any;
  markers:Array<any> = [];
  infoWindows:Array<any> = [];
  mapOptions = {
    center: new naver.maps.LatLng(36.0190335, 129.3433895),
    zoom: 5
  };
  private uidSUB: Subscription;

  private UID: string;
  // private username: string;
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
  storageImg: string;
  constructor(
    private auth: AuthService,
    private plan: PlanService,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,

  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user=>{
      if(user) this.UID = user.uid
      // this.username = user.displayName
    })
    this.map = new naver.maps.Map('map', this.mapOptions);
    // for(var i = 0; i < this.markers.length; i++) {
    //   naver.maps.Event.removeEventListener(this.markers[i], 'click');
    // }
    this.setMarker();


  }

  newPlan(name:string, days: number, content:string ){
    console.log(this.UID, content, name, days)
    this.plan.newPlan(this.UID, name, days, content);
    
  }


  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'for our web service project' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
    this.task.snapshotChanges().subscribe(results=>{
      console.log(results.downloadURL)
    })
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          // this.db.collection('photos').add({ path, size: snap.totalBytes });
          console.log(this.snapshot)
        }
      }),
      finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() )
      
    );


    // The file's download URL
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
  setMarker() {
    for(var i = 0; i < 1; i++) {
      var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(36.0190335, 129.3433895),
        map: this.map,
      });
      
      var infoWindow = new naver.maps.InfoWindow({
        content: [
          '<div style="padding: 7px 10px; max-width: 300px;">',
          '   <div style="font-size: 18px; font-weight: 600; margin: 3px 0px;">'+'title'+' </div>',
          '   <div style="font-size: 15px; margin: 3px 0px;">'+'tel: ' +'054'+'</div>',
          '</div>'].join(''),
        borderWidth: 1,
        borderColor: "#A3BDD7",
      });
      
      this.markers.push(marker);
      this.infoWindows.push(infoWindow);
    }
    for(var i = 0; i < this.markers.length; i++) {
      naver.maps.Event.addListener(this.markers[i], 'click', this.getClickHandler(i));
    }
  }
  getClickHandler(seq) {
    return (e) => {
      var marker = this.markers[seq],
        infoWindow = this.infoWindows[seq];

      if (infoWindow.getMap()) {
        infoWindow.close();
      } 
      else {
        infoWindow.open(this.map, marker);
      }
    }
  }
}
