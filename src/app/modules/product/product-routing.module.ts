import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';



export default [
  {
      path     : '',
      component: ProductListComponent,
  },
  {
    path: 'add',
    component: ProductAddEditComponent
  }
] as Routes;