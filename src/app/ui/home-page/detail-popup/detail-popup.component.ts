import { Component, OnInit, Inject } from '@angular/core';
import { LocationService } from '../../../core/location.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from '@firebase/util';

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
  selector: 'detail-popup',
  templateUrl: './detail-popup.component.html',
  styleUrls: ['./detail-popup.component.scss']
})
export class DetailPopupComponent implements OnInit {
  location: Observable<any>;
  
  constructor(
    private loca: LocationService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { 
    
  }

  ngOnInit() {
  }

  getLocation(){
    // this.location = this.loca.getlocation(this.data)
  }
}
