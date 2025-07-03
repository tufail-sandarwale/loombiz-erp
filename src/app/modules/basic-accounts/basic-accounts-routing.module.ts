import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { inject } from '@angular/core';

export default [
  {
    path: 'account-groups',
    loadChildren: () => import('app/modules/basic-accounts/account-groups/account-groups-routing.module')
  },
  {
    path: 'account',
    loadChildren: () => import('app/modules/basic-accounts/account/account-routing.module')
  },
  {
    path: 'bank',
    loadChildren: () => import('app/modules/basic-accounts/bank/bank-routing.module')
  },
  {
    path: 'ledgers',
    loadChildren: () => import('app/modules/basic-accounts/ledgers/ledgers-routing.module')
  },
  {
    path: 'payment',
    loadChildren: () => import('app/modules/basic-accounts/payment/payment-routing.module')
  },
  {
    path: 'receipt',
    loadChildren: () => import('app/modules/basic-accounts/receipt/receipt-routing.module')
  },
  {
    path: 'credit-note',
    loadChildren: () => import('app/modules/basic-accounts/credit-note/credit-note-routing.module')
  },
  {
    path: 'debit-note',
    loadChildren: () => import('app/modules/basic-accounts/debit-note/debit-note-routing.module')
  },
  {
    path: 'contra',
    loadChildren: () => import('app/modules/basic-accounts/contra/contra-routing.module')
  },
  {
    path: 'jounal-voucher',
    loadChildren: () => import('app/modules/basic-accounts/jounal-voucher/jounal-voucher-routing.module')
  },
  {
    path: 'expense',
    loadChildren: () => import('app/modules/basic-accounts/expense/expense-routing.module')
  },
  {
    path: 'petty-cash-book',
    loadChildren: () => import('app/modules/basic-accounts/petty-cash-book/petty-cash-book-routing.module')
  },

] as Routes;