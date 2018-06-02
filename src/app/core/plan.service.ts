import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

//services
import { AuthService } from '../core/auth.service';

interface plan {
  // uid: string;
  // email?: string | null;
  // photoURL?: string;
  // displayName?: string;
}


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  
  plansCollection: AngularFirestoreCollection<any>;
  planCollection:   AngularFirestoreDocument<any>;
  private uid: string;
  uidSub : Subscription;

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService
  ) {
    // this.uid = this.auth.getUID;

    this.plansCollection = this.afs.collection('plan_folder');
   }
//this.auth.user.uid

  getPlans(): Observable<any[]> {
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

  getDays(plan_id: string): Observable<any[]>{
    return this.afs.collection('plan_folder').doc(plan_id).collection('days').snapshotChanges().pipe(
      map((actions)=>{
        return actions.map((a)=>{
          const data = a.payload.doc.data();
          return {id: a.payload.doc.id, ...data};
        })
      })
    );
  }

}
