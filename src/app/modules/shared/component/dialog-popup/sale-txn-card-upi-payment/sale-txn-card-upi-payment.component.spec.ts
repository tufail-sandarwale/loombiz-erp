import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTxnCardUpiPaymentComponent } from './sale-txn-card-upi-payment.component';

describe('SaleTxnCardUpiPaymentComponent', () => {
  let component: SaleTxnCardUpiPaymentComponent;
  let fixture: ComponentFixture<SaleTxnCardUpiPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleTxnCardUpiPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleTxnCardUpiPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
