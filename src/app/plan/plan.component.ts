import { Component, OnInit } from '@angular/core';
import { PlanService } from '../core/plan.service';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { planfolder } from './planfolder';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewplanPopupComponent } from './plan-detail/newplan-popup/newplan-popup.component';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  plans: Observable<any[]>;
  user: Observable<any>;
  UID: string;
  uidSUB : Subscription;

  constructor(
    private planService: PlanService,
    public auth: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.plans = this.planService.getMyPlans();
  }


  getPlans(){
      
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
}
