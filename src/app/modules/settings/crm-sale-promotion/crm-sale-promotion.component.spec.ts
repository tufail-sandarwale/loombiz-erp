import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSalePromotionComponent } from './crm-sale-promotion.component';

describe('CrmSalePromotionComponent', () => {
  let component: CrmSalePromotionComponent;
  let fixture: ComponentFixture<CrmSalePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmSalePromotionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrmSalePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
