import { Component, OnInit, Inject } from '@angular/core';
import { PlanService } from '../../core/plan.service';
import { Observable } from 'rxjs';

import { LocationService } from '../../core/location.service';
import { AuthService } from '../../core/auth.service';

//import { planfolder } from '../planfolder';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { SearchPopupComponent } from './search-popup/search-popup.component';
import { Pipe, PipeTransform } from '@angular/core';  

@Pipe({  
    name: 'range',  
    pure: false  
})  

@Component({
  selector: 'plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit, PipeTransform{
  transform(items: any[], quantity: number): any {  
    items.length = 0;
    for (let i = 0; i < quantity; i++) {
      items.push(i);
    }
    return items;
  }  
  
  plans: Observable<any[]>;
  plan_id : string;
  days:any;
  locations: Observable<any[]>;
  plan: Observable<any>;
  
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
    // this.plans = this.planService.getAllPlans();
    this.getPlanID();
    this.getPlanDetails(this.plan_id);
    this.getPlanBasicInfo(this.plan_id);
    console.log(this.plan_id);
  }
   
  getPlanID(): void {
    this.plan_id = this.route.snapshot.paramMap.get('plan_id');
  }

  getPlanBasicInfo(plan_id: string){
    // this.planService.getOnePlan(plan_id).subscribe();
    this.planService.getOnePlan(plan_id).subscribe(result=>{
      this.plan = result
    })
  }

  getPlanDetails(plan_id: string){
     this.planService.getPlanDays(plan_id)
     .subscribe(data=>{
      this.days = data;
      console.log(data)
      for(let i = 0 ; i<this.days.length;i++){
         this.planService.getLocations(plan_id,this.days[i].id)
         .subscribe(data =>{
            
            for(let j = 0;j<data.length;j++){
              this.planService.getLocationInfo(data[j].id)
               .ref
              .get().then(doc=>{
                data[j].info =  doc.data()
              })
            }
            this.days[i].locations  = data;
            // console.log(this.days)
         })
      }
     })
  }

  openDialog(planId, day) {
    const dialogRef = this.dialog.open(SearchPopupComponent, {
      data:{planID:planId, Day: day}, //searchpoptcomp 에 저 데이터를 보여주는 거 
      height: '90%',
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  deleteLocationInPlan(day, locationId){
    console.log(day, locationId)
    this.afs.collection('plan_folder').doc(this.plan_id).collection('days').doc(day).collection('locations').doc(locationId).delete();
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
