import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDespatchReportComponent } from './sale-despatch-report.component';

describe('SaleDespatchReportComponent', () => {
  let component: SaleDespatchReportComponent;
  let fixture: ComponentFixture<SaleDespatchReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleDespatchReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleDespatchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
