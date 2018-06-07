import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { LocationService } from '../../core/location.service';

import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap, finalize } from 'rxjs/operators';
import firebase from '@firebase/app';
import { MAT_DIALOG_DATA } from '@angular/material';

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
  selector: 'update-loca-popup',
  templateUrl: './update-loca-popup.component.html',
  styleUrls: ['./update-loca-popup.component.scss']
})
export class UpdateLocaPopupComponent implements OnInit {
  private locations: location[][];
  public location_info: any;
  private UID: string;
  private username: string;
  private loca_name:string;
  isHovering: boolean;
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;
  path: string;
  // State for dropzone CSS toggling
  storageImg: string;

  storageRef: any;
  // storage2 = firebase.storage();
  constructor(
    private auth: AuthService,
    private loca: LocationService,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private fs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }

  ngOnInit() {
    this.location_info = this.data.location_info;
    console.log(this.location_info)
  }

  editLocation(name,city,neighborhood,content){
    console.log(this.location_info.id,name,city,neighborhood,content)
    this.fs.collection('locations').doc(this.location_info.id).update({
      city: city,
      name: name,
      neighborhood: neighborhood,
      content: content
    })
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
    this.path = `photos/${new Date().getTime()}_${file.name}`;
    console.log(this.path)
    // let pathReference = this.storage2.ref(this.path);
    // pathReference.getDownloadURL().then(function(url){
    //   console.log(url)
    // });
    // Totally optional metadata
    const customMetadata = { app: 'for our web service project' };

    // The main task
    this.task = this.storage.upload(this.path, file, { customMetadata });
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          // this.db.collection('photos').add({ path, size: snap.totalBytes });
            console.log("hello~??")
        }
      }),
      finalize(() => this.downloadURL = this.storage.ref(this.path).getDownloadURL() )
      
    );

    this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          // this.db.collection('photos').add({ path, size: snap.totalBytes });
        }
      }),
      finalize(() => this.downloadURL = this.storage.ref(this.path).getDownloadURL() )
      
    ).subscribe()
    // The file's download URL      console.log(firebase.storage().ref(this.path).getDownloadURL);
    // console.log(firebase.storage().ref(this.path).getDownloadURL());
    

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
