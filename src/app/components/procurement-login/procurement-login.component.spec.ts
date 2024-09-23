import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementLoginComponent } from './procurement-login.component';

describe('ProcurementLoginComponent', () => {
  let component: ProcurementLoginComponent;
  let fixture: ComponentFixture<ProcurementLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
