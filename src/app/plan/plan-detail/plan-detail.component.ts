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
    console.log(this.plan_id);
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

// <div *ngFor="let plan of plans | async">
//         <div *ngIf="plan.id == plan_id">
//             <!-- [style.backgroundColor]="'yellow'"  -->
//             <mat-card >
//                 <!-- <img mat-card-image src="{{plan.img}}">
//                 <div mat-card-avatar class="header-image"></div> -->
//                 <mat-card-title>{{plan.plan_name}}</mat-card-title>
//                 <!-- <mat-card-title>{{hero.name}}</mat-card-title> -->
//                 <mat-card-subtitle>Days: {{plan.days}}</mat-card-subtitle>
//                 <!-- <mat-card-content>{{hero.content}}</mat-card-content> -->
        
//                 <mat-card-actions>
//                   <!-- <button routerLink="/plan-detail/{{plan.plan_id}}" mat-button>EDIT</button> -->
//                   <!-- <button mat-button (click)="delete(hero.idnum)">DELETE</button>
//                   <button mat-button *ngIf= "isAuth" (click)="liked()">LIKE</button> -->
//                 </mat-card-actions>
//             </mat-card>
      
//        <div *ngFor="let item of array(plan.days); let i = index;">
//         <mat-accordion>
//             <mat-expansion-panel>
//               <mat-expansion-panel-header>
//                 <mat-panel-title>
//                   Day {{i+1}}
//                 </mat-panel-title>
//                 <mat-panel-description>
//                   Edit Locations
//                 </mat-panel-description>
//               </mat-expansion-panel-header>
//               <!-- <p>hey come on {{day.id.location}}</p> -->
//               <!-- locations for each day -->
//               <div *ngFor="let location of locations | async">
//                   <div *ngFor="let day of days | async">
//                       <mat-card class="dayCard">
//                         <img mat-card-image src="{{location.img}}">
//                         <div mat-card-avatar class="header-image"></div>
//                         <mat-card-title>{{location.name}}</mat-card-title>
//                         <mat-card-subtitle>{{location.city}} {{location.neighborhood}}</mat-card-subtitle>
//                         <mat-card-content>{{location.content}}</mat-card-content>
                
//                         <mat-card-actions>
//                           <!-- <button routerLink="/plan-detail/{{plan.plan_id}}" mat-button>EDIT</button> -->
//                           <button mat-button (click)="deleteLocationInPlan(plan.id, i+1, location.id)">DELETE</button>
//                         </mat-card-actions>
//                     </mat-card>
//                 </div>
//               </div>
//               <i mat-dialog-title class="material-icons" md-48 (click)="openDialog(plan.id, i+1)">add_circle_outline</i>
//             </mat-expansion-panel>
//           </mat-accordion>
//     </div>
//   </div>
// </div>

