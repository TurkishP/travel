import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlanService } from './plan.service';

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
  private comments: Observable<any[]>;

  dateSent: firebase.firestore.FieldValue;
  private uidSUB: Subscription;
  UID: string;
  uid$ = new Subject<String>();
  username: string;
  likedLocations:any;
  constructor( 
    private afs: AngularFirestore,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private planService: PlanService
  ) {
    this.locationsCollection = this.afs.collection('locations');
    
    this.uidSUB = this.auth.UID.subscribe({
      next(uid){ this.UID = uid
        console.log(this.UID)
      }
    }
  )
   
  this.afAuth.authState.subscribe(user=>{
    if(user) {this.username = user.displayName}
  })

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

  
  newComment(content: string, location_id:string, uid:string, photoURL: string){
    console.log(content, location_id, uid, this.username)
    this.locationsCollection.doc(location_id).collection('comments').add({
      content: content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      username: this.username,
      photoURL: photoURL
    })
    // this.locationsCollection.add(location);
  }

  getComments(location_id): Observable<any[]>{
    return this.comments = this.locationsCollection.doc(location_id).collection('comments', ref => ref.orderBy
    ('timestamp','asc'))
    .snapshotChanges().pipe(
     map(actions => actions.map(a => {
      const data = a.payload.doc.data() as location;
      const id = a.payload.doc.id;
      return {id, ...data};
    })) 
   );

  }

  deleteLocation(id:string){
    this.locationsCollection.doc(id).delete();
  }

  editLocation(id:string){
  }

  getlikes(user_id:string): any{
   this.planService.getlikeLocations(user_id)
    .subscribe(data=>{
        this.likedLocations = data;
        
        for(let i = 0 ; i<this.likedLocations.length;i++){
          this.planService.getLocationInfo(data[i].id)
          .ref.get().then(doc=>{
            this.likedLocations[i].info = doc.data()
          })
          if( i == this.likedLocations.length-1){
            console.log(this.likedLocations)
            return this.likedLocations;
          }
        }
        
    })
  }

    getlocation(id:string): Observable<any>{
       return this.locationsCollection.doc(id).valueChanges();
       }

}

