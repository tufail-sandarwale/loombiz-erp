import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingUdfComponent } from './pricing-udf.component';

describe('PricingUdfComponent', () => {
  let component: PricingUdfComponent;
  let fixture: ComponentFixture<PricingUdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingUdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingUdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
