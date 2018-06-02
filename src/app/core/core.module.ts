import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NotifyService } from './notify.service';
import { PlanService } from './plan.service';

@NgModule({
  providers: [AuthService, AuthGuard, NotifyService, PlanService]
})
export class CoreModule { }
