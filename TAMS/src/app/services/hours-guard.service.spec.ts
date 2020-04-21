import { TestBed } from '@angular/core/testing';

import { HoursGuardService } from './hours-guard.service';

describe('HoursGuardService', () => {
  let service: HoursGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoursGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
