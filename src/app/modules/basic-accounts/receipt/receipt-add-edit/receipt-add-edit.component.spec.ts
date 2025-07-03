import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptAddEditComponent } from './receipt-add-edit.component';

describe('ReceiptAddEditComponent', () => {
  let component: ReceiptAddEditComponent;
  let fixture: ComponentFixture<ReceiptAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
