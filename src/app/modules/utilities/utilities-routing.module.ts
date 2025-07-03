import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { inject } from '@angular/core';

export default [
  {
    path: 'data-backup',
    loadChildren: () => import('app/modules/utilities/data-backup/data-backup-routing.module')
  },
  {
    path: 'data-sync',
    loadChildren: () => import('app/modules/utilities/data-sync/data-sync-routing.module')
  },
  {
    path: 'change-password',
    loadChildren: () => import('app/modules/utilities/change-password/change-password-routing.module')
  },
  {
    path: 'day-end',
    loadChildren: () => import('app/modules/utilities/day-end/day-end-routing.module')
  },
  {
    path: 'year-end-processing',
    loadChildren: () => import('app/modules/utilities/year-end-processing/year-end-processing-routing.module')
  },
  {
    path: 'stock-checking',
    loadChildren: () => import('app/modules/utilities/stock-checking/stock-checking-routing.module')
  },
  {
    path: 'cheque-printing',
    loadChildren: () => import('app/modules/utilities/cheque-printing/cheque-printing-routing.module')
  },
  {
    path: 'product-barcode-printing',
    loadChildren: () => import('app/modules/utilities/product-barcode-printing/product-barcode-printing-routing.module')
  },
] as Routes;