import { Component, OnInit } from '@angular/core';
import { PlanService } from '../core/plan.service';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { planfolder } from './planfolder';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  plans: Observable<any[]>;
  user: Observable<any>;

  constructor(private planService: PlanService,
    public auth: AuthService) { }

  ngOnInit() {
    this.plans = this.planService.getPlans();
  }

  // seeDetail(plan_id : string){

  // }
}
