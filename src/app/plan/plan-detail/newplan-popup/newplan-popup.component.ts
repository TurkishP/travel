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

@Component({
  selector: 'newplan-popup',
  templateUrl: './newplan-popup.component.html',
  styleUrls: ['./newplan-popup.component.scss']
})
export class NewplanPopupComponent implements OnInit {

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
}
