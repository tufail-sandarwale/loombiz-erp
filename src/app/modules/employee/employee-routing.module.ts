import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { EmployeeComponent } from './employee.component';
import { inject } from '@angular/core';
import { EmployeeService } from './employee.service';
import { catchError, throwError } from 'rxjs';


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
        component: EmployeeListComponent
      },
      {
        path: 'add',
        component: EmployeeAddEditComponent
      },
      {
        path: 'edit/:id',
        component: EmployeeAddEditComponent,
        resolve: {
          user: userByIdResolver
        }
      }
    ]
  }

] as Routes;