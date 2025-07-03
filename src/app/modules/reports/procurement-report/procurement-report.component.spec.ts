import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementReportComponent } from './procurement-report.component';

describe('ProcurementReportComponent', () => {
  let component: ProcurementReportComponent;
  let fixture: ComponentFixture<ProcurementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurementReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcurementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
