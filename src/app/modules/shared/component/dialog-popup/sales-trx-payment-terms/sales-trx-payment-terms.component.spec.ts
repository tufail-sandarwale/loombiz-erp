import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTrxPaymentTermsComponent } from './sales-trx-payment-terms.component';

describe('SalesTrxPaymentTermsComponent', () => {
  let component: SalesTrxPaymentTermsComponent;
  let fixture: ComponentFixture<SalesTrxPaymentTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTrxPaymentTermsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesTrxPaymentTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
