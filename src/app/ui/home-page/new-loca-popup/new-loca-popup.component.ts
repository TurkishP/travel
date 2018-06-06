import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { LocationService } from '../../../core/location.service';

import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap, finalize } from 'rxjs/operators';
import firebase from '@firebase/app';

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
  selector: 'new-loca-popup',
  templateUrl: './new-loca-popup.component.html',
  styleUrls: ['./new-loca-popup.component.scss']
})
export class NewLocaPopupComponent implements OnInit {
  private location: location;

  private uidSUB: Subscription;
  private usernameSUB: Subscription;

  private UID: string;
  private username: string;
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;
  path: string;
  // State for dropzone CSS toggling
  isHovering: boolean;
  storageImg: string;

  storageRef: any;

  constructor(
    private auth: AuthService,
    private loca: LocationService,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,

  
  ) {

   }

  ngOnInit() {
    // this.uidSUB = this.auth.UID.subscribe(
    //   uid => this.UID = uid
    // )
    // this.usernameSUB = this.auth.userName.subscribe(
    //   username => this.username = username
    // )
    this.afAuth.authState.subscribe(user=>{
      if(user) this.UID = user.uid
      this.username = user.displayName
    })
  }

  newLocation(name: string, city: string, neighborhood: string, content: string){
    console.log(this.UID,this.username,name, city, neighborhood, content)
    // console.log(this.downloadURL)
    this.loca.addLocation(this.username, this.UID, this.path, name, city, neighborhood, content);
    
    

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
    // The file's download URL      console.log(firebase.storage().ref(this.path).getDownloadURL);
    // console.log(firebase.storage().ref(this.path).getDownloadURL());
    console.log(this.storage.ref(this.path).getDownloadURL());

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
