import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocaPopupComponent } from './update-loca-popup.component';

describe('UpdateLocaPopupComponent', () => {
  let component: UpdateLocaPopupComponent;
  let fixture: ComponentFixture<UpdateLocaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLocaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLocaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
