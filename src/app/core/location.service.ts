import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  private location: location;
  private locationsCollection: AngularFirestoreCollection<location>;
  private locations: Observable<location[]>;
  dateSent: firebase.firestore.FieldValue;
  constructor( 
    private afs: AngularFirestore,
  ) {
    this.locationsCollection = this.afs.collection('locations');

    
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

  getlocation(id:string): Observable<location>{
    return this.afs.collection('locations').doc<location>(id).valueChanges();
  }
}
