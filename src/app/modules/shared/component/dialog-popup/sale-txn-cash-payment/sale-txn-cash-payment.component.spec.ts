import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTxnCashPaymentComponent } from './sale-txn-cash-payment.component';

describe('SaleTxnCashPaymentComponent', () => {
  let component: SaleTxnCashPaymentComponent;
  let fixture: ComponentFixture<SaleTxnCashPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleTxnCashPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleTxnCashPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
