import { TestBed } from '@angular/core/testing';

import { RVFormUtilsService } from './rvform-utils.service';

describe('RVFormUtilsService', () => {
  let service: RVFormUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RVFormUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
