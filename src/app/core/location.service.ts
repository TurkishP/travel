import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

interface location {
  city: string;
  content: string;
  img: string;
  name: string;
  neighborhood: string;
  timestamp: string;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locationsCollection: AngularFirestoreCollection<location[]>;
  locations: Observable<location[]>;

  constructor( 
    private afs: AngularFirestore,
  ) { }

  getLocations(): Observable<any[]>{
    return this.locations = this.afs.collection<location>('locations')
    .snapshotChanges().pipe(
     map(actions => actions.map(a => {
      const data = a.payload.doc.data() as location;
      const id = a.payload.doc.id;
      return {id, ...data};
    }))
   );
  }
}
