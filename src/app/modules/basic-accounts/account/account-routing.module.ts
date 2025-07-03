import { mapToCanActivate, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountAddGuard,AccountEditGuard,AccountListGuard,AccountViewGuard,AccountModuleGuard } from 'app/core/auth/guards/Account.guards';


export default [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: mapToCanActivate([AccountListGuard]),
        component: AccountListComponent,
      },
    ]
   }


] as Routes;