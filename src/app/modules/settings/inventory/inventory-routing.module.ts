import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { ProductAttributeSettingComponent } from './product-attribute-setting/product-attribute-setting.component';
import { PricingAttributeSettingComponent } from './pricing-attribute-setting/pricing-attribute-setting.component';
// import { DefaultUdfValueComponent } from './default-udf-value/default-udf-value.component';

export default [
  {
    path: '',
    component: InventoryComponent,
    children: [
      {
        path: 'pricing-attribute-setting',
        pathMatch: 'full',
        component: PricingAttributeSettingComponent,
      }
      
     
    ]
  }

] as Routes;