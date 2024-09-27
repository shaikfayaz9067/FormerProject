import { TestBed } from '@angular/core/testing';

import { NavbarGuard } from './navbar.guard';

describe('NavbarGuard', () => {
  let guard: NavbarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NavbarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
