import { Component, OnInit, Inject } from '@angular/core';
import { PlanService } from '../../../core/plan.service';
import { Observable } from 'rxjs';

import { LocationService } from '../../../core/location.service';
import { AuthService } from '../../../core/auth.service';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss']
})
export class SearchPopupComponent implements OnInit {
  locations: Observable<any[]>;
  savedLocations: any;


  constructor(
    public dialogRef: MatDialogRef<SearchPopupComponent>,
    public locationService: LocationService,
    public planService : PlanService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public db: AngularFirestore,
    public snackBar: MatSnackBar,

  ){
  }

  ngOnInit() {
    this.getlocations();
    this.locationsForPlan();
  }

  getlocations(){
    this.locations = this.locationService.getLocations();
  }

  locationsForPlan(){
    this.planService.getPinnedLocations(this.data.planID)
    .subscribe(data=>{
      // console.log(data)
        this.savedLocations = data;
        
        for(let i = 0 ; i<this.savedLocations.length;i++){
          this.planService.getLocationInfo(data[i].id)
          .ref.get().then(doc=>{

            this.savedLocations[i].info = doc.data()
          })
        }
    })
  }

  drop(location_id: string){
    this.db.collection('plan_folder').doc(this.data.planID).collection('pinnedLocations').doc(location_id).delete();

  }

  dropAll(){
    let count = this.savedLocations.length;
    for(let x=0; x<count;x++){
      this.drop(this.savedLocations[x].id);
    }
    
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
    }).then(()=>{
      this.snackBar.open("Added!", "Close", {
        duration: 1300,
      })
   });
   
   this.dialogRef.close();
  }
  
}
