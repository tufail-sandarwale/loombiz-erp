import { TestBed } from '@angular/core/testing';

import { GeneralLedgerReportService } from './general-ledger-report.service';

describe('GeneralLedgerReportService', () => {
  let service: GeneralLedgerReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralLedgerReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
