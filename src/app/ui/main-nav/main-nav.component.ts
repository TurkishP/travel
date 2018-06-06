import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  show = false;
  private dName: string;

  constructor(   
    private afAuth: AngularFireAuth,
    private auth: AuthService
  ) {
    this.afAuth.authState.subscribe(user=>{
      if(user) {this.dName = user.displayName}
    })
   }

  toggleCollapse() {
    this.show = !this.show;
  }


  logout() {
    this.auth.signOut();
    this.dName = "";
  }
}
