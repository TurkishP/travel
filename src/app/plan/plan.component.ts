import { Component, OnInit } from '@angular/core';
import { PlanService } from '../core/plan.service';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { planfolder } from './planfolder';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewplanPopupComponent } from './plan-detail/newplan-popup/newplan-popup.component';
import { AngularFireAuth } from 'angularfire2/auth';

interface plan {
  days: number;
  img?: string;
  plan_name: string;
  uid: string;
  content: string;
  timestamp: any;
}

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  plans: plan[]=[];
  user: Observable<any>;
  UID: string;
  uidSUB : Subscription;
  planSub: Subscription;
  // plans: Observable<any[]>;

  constructor(
    private planService: PlanService,
    public auth: AuthService,
    public dialog: MatDialog,
    private afAuth: AngularFireAuth

  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user=>{
      if(user) {this.UID = user.uid
        this.getPlans();
        this.planService.uid$.next(this.UID);
      }
      
    })


    // this.uidSUB = this.auth.

  }

  openDialog(planId, day) {
    const dialogRef = this.dialog.open(NewplanPopupComponent, {
      data:{},
      height: '90%',
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  getPlans(){
    // this.planService.getMyPlans2();
    this.planService.queyrObservable.subscribe((plans =>{
      this.plans = plans
      console.log(this.plans)

    }))


    // this.plans = this.planService.getMyPlans();
    // console.log((this.plans))
    // this.plans.subscribe(result=>{
    //   console.log(result)
    // }

  )
    // this.planSub = this.planService.plansChanged.subscribe(
    //   plan => this.plans = plan);
    // this.plans.subscribe(results=>this.planss = results)

  }

  deletePlan(plan_id:string){
    this.planService.deletePlan(plan_id);
  }


}
