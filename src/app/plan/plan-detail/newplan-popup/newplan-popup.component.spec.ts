import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplanPopupComponent } from './newplan-popup.component';

describe('NewplanPopupComponent', () => {
  let component: NewplanPopupComponent;
  let fixture: ComponentFixture<NewplanPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewplanPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewplanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
