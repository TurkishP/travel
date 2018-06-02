import { Component, OnInit, Inject } from '@angular/core';
import { PlanService } from '../../core/plan.service';
import { Observable } from 'rxjs';

import { LocationService } from '../../core/location.service';
import { AuthService } from '../../core/auth.service';

import { planfolder } from '../planfolder';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SearchPopupComponent } from './search-popup/search-popup.component';
@Component({
  selector: 'plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  plans: Observable<any[]>;
  plan_id : string;
  days: Observable<any[]>;
  locations: Observable<any[]>;
  
  array(n: number): any[] {
    return Array(n);
  }

  constructor(private planService: PlanService,
    public auth: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public locationService: LocationService,
    // public dialogRef: MatDialogRef<YourDialog>
  ) { }

  ngOnInit() {
    this.plans = this.planService.getPlans();
    this.getPlanID();
    this.getDays(this.plan_id);
    this.getlocations();
  }

  getlocations(){
    this.locations = this.locationService.getLocations();
  }

  getPlanID(): void {
    this.plan_id = this.route.snapshot.paramMap.get('plan_id');
  }

  getDays(plan_id: string){
    this.days = this.planService.getDays(plan_id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(SearchPopupComponent, {
      height: '90%',
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

//   dynamicSort(property) {
//     var sortOrder = 1;
//     if(property[0] === "-") {
//         sortOrder = -1;
//         property = property.substr(1);
//     }
//     return function (a,b) {
//         var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
//         return result * sortOrder;
//     }
// }

}


// @Component({
//   selector: 'dialog-content',
//   templateUrl: 'dialog-content.html',
// })
// export class DialogContentExampleDialog {
//   locations: Observable<any[]>;
//   constructor(public locationService: LocationService){

//   }

//   ngOnInit() {
//     this.getlocations();
//   }

//   getlocations(){
//     this.locations = this.locationService.getLocations();
//   }

// }