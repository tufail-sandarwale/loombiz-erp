import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSubCategoryComponent } from './add-product-category.component';

describe('AddProductSubCategoryComponent', () => {
  let component: AddProductSubCategoryComponent;
  let fixture: ComponentFixture<AddProductSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductSubCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProductSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
