import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocForPlanComponent } from './loc-for-plan.component';

describe('LocForPlanComponent', () => {
  let component: LocForPlanComponent;
  let fixture: ComponentFixture<LocForPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocForPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocForPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
