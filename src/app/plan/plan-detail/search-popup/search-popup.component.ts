import { Component, OnInit, Inject } from '@angular/core';
import { PlanService } from '../../../core/plan.service';
import { Observable } from 'rxjs';

import { LocationService } from '../../../core/location.service';
import { AuthService } from '../../../core/auth.service';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

//import { planfolder } from '../../planfolder';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss']
})
export class SearchPopupComponent implements OnInit {
  locations: Observable<any[]>;
  constructor(
    public locationService: LocationService,
    public planService : PlanService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public db: AngularFirestore,
  
  ){
  }

  ngOnInit() {
    this.getlocations();
  }

  getlocations(){
    this.locations = this.locationService.getLocations();
  }

  add(locationId){
    console.log(locationId,this.data.planID, this.data.Day)
    //여기서 가져다씀 
  //  // let days = this.db.collection('plan_folder').doc(this.data.planID).collection('days').snapshotChanges().pipe(
  //     map((actions)=>{
  //       return actions.map((a)=>{
  //         const data = a.payload.doc.data();
  //         return {...data};
  //       })
  //     })
  //   );

    // console.log(days.day);
    this.db.collection('plan_folder').doc(this.data.planID).collection('days').doc(this.data.Day).collection('locations').doc(locationId).set({
      // order: this.data.Order+1
    })
  //   .then(()=>{
  //     this.snackBar.open("ADDED", "Close", {
  //       duration: 2000,
  //     });
  //  });
  }
  
}
