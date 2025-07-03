import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTransactionConfirmationComponent } from './sale-transaction-confirmation.component';

describe('SaleTransactionConfirmationComponent', () => {
  let component: SaleTransactionConfirmationComponent;
  let fixture: ComponentFixture<SaleTransactionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleTransactionConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleTransactionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
