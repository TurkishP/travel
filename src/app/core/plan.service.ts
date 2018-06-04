import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import * as firebase from 'firebase/app';

//services
import { AuthService } from '../core/auth.service';

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
  planDocument:   Observable<any>;
  private uid: string;
  uidSUB : Subscription;
  private days: number;
  public user: any;
  UID: string;

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService
  ) {

    this.plansCollection = this.afs.collection('plan_folder');
    this.uidSUB = this.auth.UID.subscribe(
      uid => this.UID = uid
    )

   }


getMyPlans2(): Observable<any[]> {
  return this.afs.collection('plan_foler', ref => ref.where('uid', '==',"Vsd67d49aLbDpG015FILmN9azr03" )).snapshotChanges().pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        console.log(a.payload.doc.data())
        return { id: a.payload.doc.id, ...data };
      });
    })
  );
}

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
      this.plansCollection.doc(UID.concat(name)).collection('days').doc(i.toString());
    }
  }

  getOnePlan(plan_id: string): Observable<any>{
    return this.plansCollection.doc(plan_id).valueChanges();
  }

  getPlanDays(plan_id: string): Observable<any[]>{

    return this.afs.collection('plan_folder').doc(plan_id).collection('days').snapshotChanges().pipe(
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