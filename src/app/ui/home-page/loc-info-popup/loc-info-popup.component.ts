import { Component, OnInit , Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocationService } from '../../../core/location.service';

@Component({
  selector: 'loc-info-popup',
  templateUrl: './loc-info-popup.component.html',
  styleUrls: ['./loc-info-popup.component.scss']
})
export class LocInfoPopupComponent implements OnInit {

  location: Observable<any>;

  constructor(
  @Inject (MAT_DIALOG_DATA)public data:any,
  private afs: AngularFirestore,
  private loca: LocationService,

) { }

  comments: Observable<any[]>;
  ngOnInit() {
    this.getLocation();
  }

  getLocation(){
    this.loca.getlocation(this.data.locID).subscribe(result=>{
      this.location = result;
    })
  }


  //comments 가져오는 함수 구현해야함
}
