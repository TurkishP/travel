import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

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

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  queyrObservable: Observable<any>;
  private location: location;
  private locationsCollection: AngularFirestoreCollection<location>;
  private locations: Observable<location[]>;
  dateSent: firebase.firestore.FieldValue;
  private uidSUB: Subscription;
  UID: string;
  uid$ = new Subject<String>();
  constructor( 
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.locationsCollection = this.afs.collection('locations');
    this.uidSUB = this.auth.UID.subscribe({
      next(uid){ this.UID = uid
        console.log(this.UID)
      }
    }
  )
    
  this.queyrObservable = this.uid$.pipe(
    switchMap(uid => 
      this.afs.collection('locations', ref => ref.where
      ('uid', '==', uid)).snapshotChanges().pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
          });
        })
      )));
}

  getLocations(): Observable<any[]>{
    return this.locations = this.locationsCollection
    .snapshotChanges().pipe(
     map(actions => actions.map(a => {
      const data = a.payload.doc.data() as location;
      const id = a.payload.doc.id;
      return {id, ...data};
    }))
   );
  }
  userLocations(userID): Observable<any[]>{
    return this.locations = this.afs.collection('locations', ref => ref.where
    ('uid', '==', userID))
    .snapshotChanges().pipe(
     map(actions => actions.map(a => {
      const data = a.payload.doc.data() as location;
      const id = a.payload.doc.id;
      return {id, ...data};
    }))
   );
  }

  addLocation(username: string, uid:string, img: any, name:string, city:string, neighborhood: string, content:string ){
    
    let location: location = {
      city: city,
      content: content,
      img: img,
      name: name,
      neighborhood: neighborhood,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: username,
      uid: uid
    };

    this.locationsCollection.add(location);
  }

  deleteLocation(id:string){
    this.locationsCollection.doc(id).delete();
  }
}
