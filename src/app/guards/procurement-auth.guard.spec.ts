import { TestBed } from '@angular/core/testing';

import { ProcurementAuthGuard } from './procurement-auth.guard';

describe('AuthGuard', () => {
  let guard: ProcurementAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProcurementAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
