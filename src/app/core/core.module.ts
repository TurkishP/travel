import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NotifyService } from './notify.service';
import { PlanService } from './plan.service';
import { LocationService } from './location.service';


@NgModule({
  providers: [AuthService, AuthGuard, NotifyService, PlanService, LocationService]
})
export class CoreModule { }
