import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProstayComponent } from './prostay.component';

describe('ProstayComponent', () => {
  let component: ProstayComponent;
  let fixture: ComponentFixture<ProstayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProstayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProstayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
