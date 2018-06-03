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


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  
  plansCollection: AngularFirestoreCollection<any>;
  planDocument:   Observable<any>;
  private uid: string;
  uidSub : Subscription;
  private days: number;

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService
  ) {
    // this.uid = this.auth.getUID;

    this.plansCollection = this.afs.collection('plan_folder');
   }
//this.auth.user.uid

  getAllPlans(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.plansCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getPlanDetails(plan_id: string): Observable<any[]>{

    return this.afs.collection('plan_folder').doc(plan_id).collection('days').snapshotChanges().pipe(
      map((actions)=>{
        return actions.map((a)=>{
          const data = a.payload.doc.data();
          return {id: a.payload.doc.id,plan_id:plan_id, ...data};
        })
      })
    );

  }
  getLoca(plan_id:string,day_id: string): Observable<any[]>{
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
  getLocaInfo(loca_id:string){
     return this.afs.collection('locations').doc(loca_id)
    //  .ref
    //  .get().then(doc=>{
    //    return doc.data()
    //  })
  }

  
}
