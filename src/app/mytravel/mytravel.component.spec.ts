import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytravelComponent } from './mytravel.component';

describe('MytravelComponent', () => {
  let component: MytravelComponent;
  let fixture: ComponentFixture<MytravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
