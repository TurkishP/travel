import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocaPopupComponent } from './new-loca-popup.component';

describe('NewLocaPopupComponent', () => {
  let component: NewLocaPopupComponent;
  let fixture: ComponentFixture<NewLocaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLocaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLocaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
