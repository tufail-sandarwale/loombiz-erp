import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBarcodePrintingComponent } from './product-barcode-printing.component';

describe('ProductBarcodePrintingComponent', () => {
  let component: ProductBarcodePrintingComponent;
  let fixture: ComponentFixture<ProductBarcodePrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBarcodePrintingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBarcodePrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
