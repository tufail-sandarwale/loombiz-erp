import { TestBed } from '@angular/core/testing';

import { ProductSubCategoryItemService } from './product-sub-category-item.service';

describe('ProductSubCategoryItemService', () => {
  let service: ProductSubCategoryItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSubCategoryItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
