import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { LocationService } from '../../../core/location.service';

import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'new-loca-popup',
  templateUrl: './new-loca-popup.component.html',
  styleUrls: ['./new-loca-popup.component.scss']
})
export class NewLocaPopupComponent implements OnInit {

  private uidSUB: Subscription;
  private usernameSUB: Subscription;

  private UID: string;
  private username: string;

  constructor(
    private auth: AuthService,
    private loca: LocationService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user=>{
      if(user) this.UID = user.uid
    })
   }

  ngOnInit() {
    this.uidSUB = this.auth.UID.subscribe(
      uid => this.UID = uid
    )
    this.usernameSUB = this.auth.userName.subscribe(
      username => this.username = username
    )

    this.auth.authState
  }

  newLocation(name: string, city: string, neighborhood: string, content: string){
    console.log(this.UID, name, city, neighborhood, content)
    this.loca.addLocation(this.username, this.UID, name, city, neighborhood, content);
    
  }
}
