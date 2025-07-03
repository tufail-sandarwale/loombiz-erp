import { TestBed } from '@angular/core/testing';

import { RvLayoutService } from './rv-layout.service';

describe('RvLayoutService', () => {
  let service: RvLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RvLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
