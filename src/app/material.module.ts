import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPopupComponent} from './plan/plan-detail/search-popup/search-popup.component';
import { PlanDetailComponent } from './plan/plan-detail/plan-detail.component';
import { NewLocaPopupComponent } from './ui/home-page/new-loca-popup/new-loca-popup.component';
import { NewplanPopupComponent } from './plan/plan-detail/newplan-popup/newplan-popup.component';
import { UpdateLocaPopupComponent } from './plan/update-loca-popup/update-loca-popup.component';
import { LocInfoPopupComponent } from './ui/home-page/loc-info-popup/loc-info-popup.component';
import { MapPopupComponent } from './plan/plan-detail/map-popup/map-popup.component';
import { LocForPlanComponent } from './ui/home-page/loc-for-plan/loc-for-plan.component';


import {    MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
 } from '@angular/material';
 

@NgModule({
  imports: [ MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  BrowserAnimationsModule ],
  exports: [MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,],
    entryComponents: [PlanDetailComponent, SearchPopupComponent, NewLocaPopupComponent, 
      NewplanPopupComponent,LocInfoPopupComponent,UpdateLocaPopupComponent,MapPopupComponent,LocForPlanComponent],
    declarations: [PlanDetailComponent, SearchPopupComponent, NewLocaPopupComponent, 
      NewplanPopupComponent,LocInfoPopupComponent,UpdateLocaPopupComponent,MapPopupComponent,LocForPlanComponent],
    bootstrap: [PlanDetailComponent],

    providers: []
})
export class MaterialModule { }