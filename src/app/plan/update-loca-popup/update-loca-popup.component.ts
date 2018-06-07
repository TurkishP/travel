import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { LocationService } from '../../core/location.service';

import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap, finalize } from 'rxjs/operators';
import firebase from '@firebase/app';
import { MAT_DIALOG_DATA } from '@angular/material';

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
  selector: 'update-loca-popup',
  templateUrl: './update-loca-popup.component.html',
  styleUrls: ['./update-loca-popup.component.scss']
})
export class UpdateLocaPopupComponent implements OnInit {
  private locations: location[][];
  private location_id: string;
  private UID: string;
  private username: string;
  private loca_name:string;

  // storage2 = firebase.storage();
  constructor(
    private auth: AuthService,
    private loca: LocationService,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private fs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }

  ngOnInit() {
    this.location_id = this.data.location_id;
  }
  updateLocation(){
  }
}
