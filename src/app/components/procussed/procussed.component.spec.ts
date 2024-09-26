import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcussedComponent } from './procussed.component';

describe('ProcussedComponent', () => {
  let component: ProcussedComponent;
  let fixture: ComponentFixture<ProcussedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcussedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcussedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
