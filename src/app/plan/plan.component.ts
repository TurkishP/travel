import { Component, OnInit } from '@angular/core';
import { PlanService } from '../core/plan.service';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewplanPopupComponent } from './plan-detail/newplan-popup/newplan-popup.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocationService } from '../core/location.service';
import { NewLocaPopupComponent } from '../ui/home-page/new-loca-popup/new-loca-popup.component';
import { UpdateLocaPopupComponent } from './update-loca-popup/update-loca-popup.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

interface plan {
  days: number;
  img?: string;
  plan_name: string;
  uid: string;
  content: string;
  timestamp: any;
}

interface location {
  city: string;
  content: string;
  img?: string;
  name: string;
  neighborhood: string;
  timestamp: any;
  username?: string;
  uid:string;
}

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  
  locations: location[]=[];
  plans: plan[]=[];
  user: Observable<any>;
  UID: string;
  uidSUB : Subscription;
  planSub: Subscription;
  dName: string;
  isHovering: boolean;
  likes: any;
  info: any;
  // plans: Observable<any[]>;

  constructor(
    private planService: PlanService,
    public auth: AuthService,
    public dialog: MatDialog,
    private afAuth: AngularFireAuth,
    public locationService: LocationService,
    public afs : AngularFirestore
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user=>{
      if(user) {this.UID = user.uid
        this.getPlans();
        this.getTravel();
        this.getLikes();
        this.planService.uid$.next(this.UID);
        this.dName = user.displayName;

      }
      
    })


    // this.uidSUB = this.auth.

  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewplanPopupComponent, {
      data:{},
      height: '300px',
      width: '280px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openDialog2() {
    const dialogRef = this.dialog.open(NewLocaPopupComponent, {
      data:{},
      height: '570px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  getPlans(){
    // this.planService.getMyPlans2();
        this.planService.queyrObservable.subscribe((plans =>{
          this.plans = plans
          // console.log(this.plans)

      }))
  }

  getTravel(){
      this.locationService.userLocations(this.UID).subscribe((locations =>{
        this.locations = locations
        })
      )
  }

  deletePlan(plan_id:string){
    this.planService.deletePlan(plan_id);
  }

  deleteLocation(location_id:string){
    this.locationService.deleteLocation(location_id);
  }

  updateLocation(location_info:string){
    const dialogRef = this.dialog.open(UpdateLocaPopupComponent, {
      data:{location_info:location_info},
      height: '570px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getLikes(){
    // console.log(this.locationService.getlikes(this.UID))
    // this.likes = this.locationService.getlikes(this.UID);
    // console.log(this.likes)
    this.planService.getlikeLocations(this.UID)
    .subscribe(data=>{
        this.likes = data;
        
        for(let i = 0 ; i<this.likes.length;i++){
          this.planService.getLocationInfo(data[i].id)
          .ref.get().then(doc=>{

            this.likes[i].info = doc.data()
          })
        }
    })
  }

  deleteLike(like_id:string){
    this.afs.collection('users').doc(this.UID).collection('like').doc(like_id).delete();
  }

}
