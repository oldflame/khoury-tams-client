import { TestBed } from '@angular/core/testing';

import { FillHoursService } from './fill-hours.service';

describe('FillHoursService', () => {
  let service: FillHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
