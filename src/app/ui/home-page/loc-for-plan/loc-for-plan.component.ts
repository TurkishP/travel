import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocationService } from '../../../core/location.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { PlanService } from '../../../core/plan.service';

interface plan {
  days: number;
  img?: string;
  plan_name: string;
  uid: string;
  content: string;
  timestamp: any;
}

@Component({
  selector: 'loc-for-plan',
  templateUrl: './loc-for-plan.component.html',
  styleUrls: ['./loc-for-plan.component.scss']
})
export class LocForPlanComponent implements OnInit {


  UID: string;
  plans: plan[]=[];

  constructor(
    @Inject (MAT_DIALOG_DATA)public data:any,
    private afs: AngularFirestore,
    private loca: LocationService,
    private plan: PlanService,
    private afAuth: AngularFireAuth,
    public dialogRef: MatDialogRef<LocForPlanComponent>,

  ) {    this.afAuth.authState.subscribe(user=>{
    if(user) {this.UID = user.uid
      this.plan.uid$.next(this.UID);
    }
     }) 
  }

  ngOnInit() {
    this.getplans();
  }

  getplans(){
    this.plan.queyrObservable.subscribe((plans =>{
      this.plans = plans
      console.log(this.plans)

    }))
  }

  keepForPlan(plan_id:string){
    console.log(this.data.location_id, plan_id)
    this.afs.collection('plan_folder').doc(plan_id).collection('pinnedLocations').doc(this.data.location_id).set({
      hi: "hi"
    });
    this.dialogRef.close();

  }
}
