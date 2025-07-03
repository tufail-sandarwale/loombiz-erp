import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUdfComponent } from './product-udf.component';

describe('ProductUdfComponent', () => {
  let component: ProductUdfComponent;
  let fixture: ComponentFixture<ProductUdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
