import { Routes } from '@angular/router';
import { ProductSubCategoryItemComponent } from './product-sub-category-item.component';
import { AddProductSubCategoryComponent } from './add-product-sub-category-item/add-product-category.component';


export default [
  {
      path     : '',
      component: AddProductSubCategoryComponent,
  }
] as Routes;