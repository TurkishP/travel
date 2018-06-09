import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';


interface tag{}

@Injectable({
  providedIn: 'root'
})
export class TagService {

  queyrObservable: Observable<any>;

  private tagCollection: AngularFirestoreCollection<any[]>;
  private tags: Observable<any[]>;
  


  private uidSUB: Subscription;
  UID: string;
  uid$ = new Subject<String>();
  username: string;
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
  ) {

    this.tagCollection = this.afs.collection('hashtag');
   
  }

  addtag(tag:string,locid:string){
    this.tagCollection.doc(tag).collection('loccid').add({num: locid});
  }


}