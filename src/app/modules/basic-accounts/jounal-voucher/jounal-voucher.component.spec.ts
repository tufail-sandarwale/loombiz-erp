import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JounalVoucherComponent } from './jounal-voucher.component';

describe('JounalVoucherComponent', () => {
  let component: JounalVoucherComponent;
  let fixture: ComponentFixture<JounalVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JounalVoucherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JounalVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
