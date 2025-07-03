import { ActivatedRouteSnapshot, mapToCanActivate, RouterStateSnapshot, Routes } from '@angular/router';
import { inject } from '@angular/core';
// import { ProductAttributesModuleGuard, ProductAttributesPermissionGuard } from 'app/core/auth/guards/product-attribute.guards';
// import { ProductVariantsPermissionGuard } from 'app/core/auth/guards/product-variants.guards';

export default [
  
  {
    path: 'employee',
    loadChildren: () => import('app/modules/masters/employee/employee-routing.module')
  },
  
  
] as Routes;