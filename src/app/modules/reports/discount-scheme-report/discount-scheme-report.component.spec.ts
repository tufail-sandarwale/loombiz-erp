import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountSchemeReportComponent } from './discount-scheme-report.component';

describe('DiscountSchemeReportComponent', () => {
  let component: DiscountSchemeReportComponent;
  let fixture: ComponentFixture<DiscountSchemeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountSchemeReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountSchemeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
