import { Component, OnInit , Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'loc-info-popup',
  templateUrl: './loc-info-popup.component.html',
  styleUrls: ['./loc-info-popup.component.scss']
})
export class LocInfoPopupComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA)public data:any) { }

  comments: Observable<any[]>;
  ngOnInit() {
  }


  //comments 가져오는 함수 구현해야함
}
