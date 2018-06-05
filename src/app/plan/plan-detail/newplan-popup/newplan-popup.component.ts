import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { PlanService } from '../../../core/plan.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'newplan-popup',
  templateUrl: './newplan-popup.component.html',
  styleUrls: ['./newplan-popup.component.scss']
})
export class NewplanPopupComponent implements OnInit {

  private uidSUB: Subscription;

  private UID: string;
  // private username: string;

  constructor(
    private auth: AuthService,
    private plan: PlanService,
    private afAuth: AngularFireAuth

  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user=>{
      if(user) this.UID = user.uid
      // this.username = user.displayName
    })

  }

  newPlan(name:string, days: number, content:string ){
    console.log(this.UID, content, name, days)
    this.plan.newPlan(this.UID, name, days, content);
    
  }

}
