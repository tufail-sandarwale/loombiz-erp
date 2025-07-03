import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityUdfComponent } from './quantity-udf.component';

describe('QuantityUdfComponent', () => {
  let component: QuantityUdfComponent;
  let fixture: ComponentFixture<QuantityUdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityUdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantityUdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
