import { Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { permissionsResolver, roleByIdResolver } from './roles-resolvers';



export default [
  {
    path: '',
    component: RolesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RolesListComponent,
      },
      {
        path: 'add',
        component: RoleAddEditComponent,
        resolve: {
          permission: permissionsResolver,
        },
      },
      {
        path: ':id',
        component: RoleAddEditComponent,
        resolve: {
          permission: permissionsResolver,
          role: roleByIdResolver
        },
      }
    ]
  }

] as Routes;