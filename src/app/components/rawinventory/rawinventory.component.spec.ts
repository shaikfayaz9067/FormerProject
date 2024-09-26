import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawinventoryComponent } from './rawinventory.component';

describe('RawinventoryComponent', () => {
  let component: RawinventoryComponent;
  let fixture: ComponentFixture<RawinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawinventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
