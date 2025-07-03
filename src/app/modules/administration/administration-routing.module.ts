import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { inject } from '@angular/core';

export default [
  {
    path: 'firm',
    loadChildren: () => import('app/modules/administration/firm/firm-routing.module')
  },
  {
    path: 'store',
    loadChildren: () => import('app/modules/administration/store/store-routing.module')
  },
  {
    path: 'languages',
    loadChildren: () => import('app/modules/administration/languages/languages-routing.module')
  },
  {
    path: 'currency',
    loadChildren: () => import('app/modules/administration/currency/currency-routing.module')
  },
  {
    path: 'warehouse',
    loadChildren: () => import('app/modules/administration/warehouse/warehouse-routing.module')
  },

  
] as Routes;