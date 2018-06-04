import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

//services
import { AuthService } from '../core/auth.service';

interface plan {
    days: number;
    img?: string;
    plan_name: string;
    uid: string;
}


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  
  plansCollection: AngularFirestoreCollection<any>;
  planDocument:   Observable<any>;
  private uid: string;
  uidSub : Subscription;
  private days: number;
  public user: any;

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService
  ) {

    this.plansCollection = this.afs.collection('plan_folder');
    // this.uid = this.auth.getUID
    // this.auth.user.subscribe(result=>{
    //   this.uid = result.uid;
    //   console.log(this.uid)
    // });

   }

getMyPlans2(): Observable<any[]> {
  return this.afs.collection('plan_foler', ref => ref.where('uid', '==', this.auth.getUID )).snapshotChanges().pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        // console.log(data)
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