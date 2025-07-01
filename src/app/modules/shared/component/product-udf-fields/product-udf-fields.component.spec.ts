import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUdfFieldsComponent } from './product-udf-fields.component';

describe('ProductUdfFieldsComponent', () => {
  let component: ProductUdfFieldsComponent;
  let fixture: ComponentFixture<ProductUdfFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUdfFieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUdfFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
