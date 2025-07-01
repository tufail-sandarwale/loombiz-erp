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
      }
    ]
  }

] as Routes;