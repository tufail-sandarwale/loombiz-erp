import { Routes } from '@angular/router';



export default [
  {
    path: 'masters-report',
    loadChildren: () => import('app/modules/reports/masters-report/masters-report-routing.module')
  },
  {
    path: 'pos-report',
    loadChildren: () => import('app/modules/reports/pos-report/pos-report-routing.module')
  },
  {
    path: 'sale-despatch-report',
    loadChildren: () => import('app/modules/reports/sale-despatch-report/sale-despatch-report-routing.module')
  },
  {
    path: 'accounts-report',
    loadChildren: () => import('app/modules/reports/accounts-report/accounts-report-routing.module')
  },
  {
    path: 'procurement-report',
    loadChildren: () => import('app/modules/reports/procurement-report/procurement-report-routing.module')
  },
  {
    path: 'ho-store-report',
    loadChildren: () => import('app/modules/reports/ho-store-report/ho-store-report-routing.module')
  },
  {
    path: 'ho-franchise-report',
    loadChildren: () => import('app/modules/reports/ho-franchise-report/ho-franchise-report-routing.module')
  },
  {
    path: 'crm-sale-promotion-report',
    loadChildren: () => import('app/modules/reports/crm-sale-promotion-report/crm-sale-promotion-report-routing.module')
  },
  {
    path: 'discount-scheme-report',
    loadChildren: () => import('app/modules/reports/discount-scheme-report/discount-scheme-report-routing.module')
  },
  {
    path: 'general_ledger',
    loadChildren: () => import('app/modules/reports/general-ledger-report/general-ledger-report-routing.module')
  },
 
  
  
] as Routes;