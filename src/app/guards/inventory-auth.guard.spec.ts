import { TestBed } from '@angular/core/testing';

import { InventoryAuthGuard } from './inventory-auth.guard';

describe('InventoryAuthGuard', () => {
  let guard: InventoryAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InventoryAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
