import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubCategoryItemComponent } from './product-sub-category-item.component';

describe('ProductSubCategoryItemComponent', () => {
  let component: ProductSubCategoryItemComponent;
  let fixture: ComponentFixture<ProductSubCategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSubCategoryItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSubCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
