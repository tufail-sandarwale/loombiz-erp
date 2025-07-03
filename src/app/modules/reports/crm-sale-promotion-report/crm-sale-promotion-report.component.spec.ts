import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSalePromotionReportComponent } from './crm-sale-promotion-report.component';

describe('CrmSalePromotionReportComponent', () => {
  let component: CrmSalePromotionReportComponent;
  let fixture: ComponentFixture<CrmSalePromotionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmSalePromotionReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrmSalePromotionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
