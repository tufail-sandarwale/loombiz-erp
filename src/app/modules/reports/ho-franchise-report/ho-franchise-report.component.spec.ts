import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoFranchiseReportComponent } from './ho-franchise-report.component';

describe('HoFranchiseReportComponent', () => {
  let component: HoFranchiseReportComponent;
  let fixture: ComponentFixture<HoFranchiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoFranchiseReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoFranchiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
