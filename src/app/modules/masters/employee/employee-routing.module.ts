import { ActivatedRouteSnapshot, mapToCanActivate, RouterStateSnapshot, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { EmployeeComponent } from './employee.component';
import { inject, Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { catchError, throwError } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { SessionService } from 'app/core/services/session.service';
// import { EMPADDGuard, EMPEDITGuard, EMPLISTGuard, EmployeeModuleGuard } from 'app/core/auth/guards/employee.guards';

// const permissions = inject(SessionService).permission;
// console.log(permissions)
const userByIdResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const employeeService = inject(EmployeeService);
  const userId = route.paramMap.get('id');
  return employeeService.getUser(userId).pipe(
    catchError((error) => {
      console.error(error);
      return throwError(error);
    }),
  );
};

export default [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        // canActivate: mapToCanActivate([EmployeeModuleGuard, EMPLISTGuard]),
        component: EmployeeListComponent
      },
      {
        path: 'add',
        // canActivate: mapToCanActivate([EMPADDGuard]),
        component: EmployeeAddEditComponent
      },
      {
        path: 'edit/:id',
        // canActivate: mapToCanActivate([EMPEDITGuard]),
        component: EmployeeAddEditComponent,
        resolve: {
          user: userByIdResolver
        }
      }
    ]
  }

] as Routes;