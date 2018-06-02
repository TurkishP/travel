import { Component, OnInit, Inject } from '@angular/core';
import { PlanService } from '../../../core/plan.service';
import { Observable } from 'rxjs';

import { LocationService } from '../../../core/location.service';
import { AuthService } from '../../../core/auth.service';

import { planfolder } from '../../planfolder';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss']
})
export class SearchPopupComponent implements OnInit {
  locations: Observable<any[]>;
  constructor(public locationService: LocationService){

  }

  ngOnInit() {
    this.getlocations();
  }

  getlocations(){
    this.locations = this.locationService.getLocations();
  }

  
}
