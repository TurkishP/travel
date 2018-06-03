import { Component, OnInit, Inject } from '@angular/core';
import { PlanService } from '../../core/plan.service';
import { Observable } from 'rxjs';

import { LocationService } from '../../core/location.service';
import { AuthService } from '../../core/auth.service';

import { planfolder } from '../planfolder';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { SearchPopupComponent } from './search-popup/search-popup.component';
@Component({
  selector: 'plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  plans: Observable<any[]>;
  plan_id : string;
  days:any;
  locations: Observable<any[]>;
  
  array(n: number): any[] {
    return Array(n);
  }

  constructor(private planService: PlanService,
    public auth: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public locationService: LocationService,
    private afs: AngularFirestore,

    // public dialogRef: MatDialogRef<YourDialog>
  ) { }

  ngOnInit() {
    this.plans = this.planService.getAllPlans();
    this.getPlanID();
    this.getPlanDetails(this.plan_id);
  }

  getlocations(){
    for(let i = 0 ; i<this.days.length;i++){
      for(let j = 0 ; j<this.days[i].loca.length;j++){
        console.log(this.planService.getLocaInfo(this.days[i].loca[j].id))
      }
    }
  }

  getPlanID(): void {
    this.plan_id = this.route.snapshot.paramMap.get('plan_id');
  }

  getPlanDetails(plan_id: string){
     this.planService.getPlanDetails(plan_id)
     .subscribe(data=>{
      this.days = data;
      for(let i = 0 ; i<this.days.length;i++){
         this.planService.getLoca(this.days[i].plan_id,this.days[i].id)
         .subscribe(data =>{
            
            for(let j = 0;j<data.length;j++){
              this.planService.getLocaInfo(data[j].id)
               .ref
              .get().then(doc=>{
                data[j].locationData =  doc.data()
              })
            }
            this.days[i].loca  = data;
            console.log(this.days)
         })
         
      }
      
     })
  }

  openDialog(planId, day) {
    const dialogRef = this.dialog.open(SearchPopupComponent, {
      data:{planID:planId, Day: day},
      height: '90%',
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  deleteLocationInPlan(planId, day, locationId){
    this.afs.collection('plan_folder').doc(planId).collection(day.toString()).doc(locationId).delete();
  }

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
