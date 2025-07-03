import { Routes } from '@angular/router';

import { ProductUdfComponent } from './product-udf/product-udf.component';
import { PricingUdfComponent } from './pricing-udf/pricing-udf.component';
import { QuantityUdfComponent } from './quantity-udf/quantity-udf.component';
import { UdfConfigComponent } from './udf-config.component';




export default [
  {
    path: '',
    component: UdfConfigComponent,
    children: [
       {
        path: 'product-udf',
        pathMatch: 'full',
        component: ProductUdfComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product-udf',
      },
      {
        path: 'quantity-udf',
        pathMatch: 'full',
        component: QuantityUdfComponent,
      },
      
    ]
  }

] as Routes;