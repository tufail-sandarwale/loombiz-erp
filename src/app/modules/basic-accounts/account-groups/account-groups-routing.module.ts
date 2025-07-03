import { mapToCanActivate, Routes } from '@angular/router';
import { AccountGroupsComponent } from './account-groups.component';
import { AccountGroupListComponent } from './account-group-list/account-group-list.component';
import { accountGroupAddGuard,accountGroupEditGuard,accountGroupListGuard,accountGroupModuleGuard,accountGroupViewGuard } from 'app/core/auth/guards/accountGroup.guards';


export default [
  {
    path: '',
    component: AccountGroupsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: mapToCanActivate([accountGroupListGuard,accountGroupModuleGuard]),
        component: AccountGroupListComponent,
      },
    ]
   }


] as Routes;