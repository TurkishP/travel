import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocInfoPopupComponent } from './loc-info-popup.component';

describe('LocInfoPopupComponent', () => {
  let component: LocInfoPopupComponent;
  let fixture: ComponentFixture<LocInfoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocInfoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
