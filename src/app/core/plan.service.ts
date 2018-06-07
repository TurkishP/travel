import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import * as firebase from 'firebase/app';

//services
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

interface plan {
    days: number;
    img?: string;
    plan_name: string;
    uid: string;
    content: string;
    timestamp: any;
}


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  dateSent: firebase.firestore.FieldValue;

  plansCollection: AngularFirestoreCollection<any>;
  planDocument:   Observable<plan[]>;
  uidSUB : Subscription;
  private days: number;
  public user: any;
  UID: string;
  plansChanged = new Subject<plan[]>();
  plan: Observable<plan[]>;
  uid$ = new Subject<String>();
  queyrObservable: Observable<any>;
  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
    private afAuth: AngularFireAuth

  ) {

    this.plansCollection = this.afs.collection('plan_folder');
    
      this.uidSUB = this.auth.UID.subscribe({
        next(uid){ this.UID = uid}
      }
    )

    // this.afAuth.authState.subscribe(user=>{
    //   if(user) this.UID = user.uid
    // })

    //queries for the plans of the user of UID
    this.queyrObservable = this.uid$.pipe(
      switchMap(uid => 
        this.afs.collection('plan_folder', ref => ref.where
        ('uid', '==', uid)).snapshotChanges().pipe(
          map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data();
              return { id: a.payload.doc.id, ...data };
            });
          })
        )));

 }

  
// getMyPlans2(){
//   this.queyrObservable = this.uid$.pipe(
//     switchMap(uid => 
//       this.afs.collection('plan_folder', ref => ref.where
//       ('uid', '==', uid)).snapshotChanges().pipe(
//         map((actions) => {
//           return actions.map((a) => {
//             const data = a.payload.doc.data();
//             console.log(a.payload.doc.data())
//             return { id: a.payload.doc.id, ...data };
//           });
//         })
//       )));

//   // return this.afs.collection('plan_foler', ref => ref.where('uid', '==', this.UID )).snapshotChanges().pipe(
//   //   map((actions) => {
//   //     return actions.map((a) => {
//   //       const data = a.payload.doc.data();
//   //       console.log(a.payload.doc.data())
//   //       return { id: a.payload.doc.id, ...data };
//   //     });
//   //   })
//   // );
// }

getMyPlans(): Observable<any[]> {
    return this.plansCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
}

  newPlan(UID: string, name: string, days: number, content: string){
    let plan: plan = {
      plan_name: name,
      content: content,
      // img: string;
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: UID,
      days: days,
    };

    this.plansCollection.doc(UID.concat(name)).set(plan);

    for(let i=1; i<=days; i++){
      this.plansCollection.doc(UID.concat(name)).collection('days').doc(i.toString()).set({
        loc_count:0,
        day: i
      });
    }
  }

  deletePlan(plan_id: string){
    this.plansCollection.doc(plan_id).delete();
  }

  getOnePlan(plan_id: string): Observable<any>{
    return this.plansCollection.doc(plan_id).valueChanges();
  }

  getPlanDays(plan_id: string): Observable<any[]>{

    return this.afs.collection('plan_folder').doc(plan_id).collection('days', ref => ref.orderBy
    ('day','asc')).snapshotChanges().pipe(
      map((actions)=>{
        return actions.map((a)=>{
          const data = a.payload.doc.data();
          return {id: a.payload.doc.id,plan_id:plan_id, ...data};
        })
      })
    );

  }

  getLocations(plan_id:string, day_id: string): Observable<any[]>{
      return this.afs.collection('plan_folder').doc(plan_id).collection('days').doc(day_id).collection('locations').snapshotChanges()
      .pipe(
      map((actions)=>{
        return actions.map((a)=>{
          const data = a.payload.doc.data();
          return {id: a.payload.doc.id, ...data};
        })
      })
    );
  }

  getLocationInfo(loc_id:string){
     return this.afs.collection('locations').doc(loc_id)
  }

}


// let db = {
//   locations:[],
//   notes:[],
//   plan_folder:[
//     {
//       days:3,
//       img:"",
//       plan_name:"",
//       uid:"",
//       day:[
//         {
//           uid:"",
//           info:"1일차",
//           info2:"2018-06-03",
//           location:[
//             {
//               uid:""
//             },
//             {

//             }
//           ]
//         }
//       ]
//     },
//     {

//     }
//   ],
//   reviews:[],
//   users:[]
// }