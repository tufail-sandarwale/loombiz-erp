import { Routes } from '@angular/router';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminComponent } from './admin.component';



export default [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminSettingsComponent
      },
      {
        path: 'roles',
        loadChildren: () => import('app/modules/admin/admin-settings/roles/roles-routing.module')
      },
      {
        path: 'udf-config',
        loadChildren: () => import('app/modules/admin/admin-settings/udf-config/udf-config-routing.module')
      },
      {
        path: 'tax-and-rules',
        loadChildren: () => import('app/modules/settings/general/tax-and-rules/tax-and-rules-routing.module')
      }
    ]
  }

] as Routes;