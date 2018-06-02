import { Component, OnInit, Inject } from '@angular/core';
import { PlanService } from '../../core/plan.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { planfolder } from '../planfolder';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  plans: Observable<any[]>;
  plan_id : string;
  days: Observable<any[]>;

  constructor(private planService: PlanService,
    public auth: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    // public dialogRef: MatDialogRef<YourDialog>
  ) { }

  ngOnInit() {
    this.plans = this.planService.getPlans();
    this.getPlanID();
    this.getDay(this.plan_id);
  }


  getPlanID(): void {
    this.plan_id = this.route.snapshot.paramMap.get('plan_id');
  }

  getDay(plan_id: string){
    this.days = this.planService.getDays(plan_id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      height: '800px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContentExampleDialog {}