import { TestBed } from '@angular/core/testing';

import { GetCommonService } from './get-common.service';

describe('GetCommonService', () => {
  let service: GetCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
