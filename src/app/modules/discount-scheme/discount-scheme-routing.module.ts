import { Routes } from '@angular/router';



export default [
  {
    path: 'price-modification',
    loadChildren: () => import('app/modules/discount-scheme/price-modification/price-modification-routing.module')
  },
  {
    path: 'discount-scheme-1',
    loadChildren: () => import('app/modules/discount-scheme/discount-scheme-1/discount-scheme-1-routing.module')
  },
  {
    path: 'discount-scheme-2',
    loadChildren: () => import('app/modules/discount-scheme/discount-scheme-2/discount-scheme-2-routing.module')
  },
  {
    path: 'discount-scheme-3',
    loadChildren: () => import('app/modules/discount-scheme/discount-scheme-3/discount-scheme-3-routing.module')
  }
] as Routes;