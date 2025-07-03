import { Routes } from '@angular/router';
import { EmployeeSalePerformaceComponent } from './employee-sale-performace/employee-sale-performace.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DynaDashboardComponent } from '../shared/component/dyna-dashboard/dyna-dashboard.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { DashboardService } from './dashboard.service';

const dashboardByCodeResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const dashboardService = inject(DashboardService);
  const code = route.paramMap.get('dashboardCode');
  if (localStorage.getItem(code)) {
    return of(JSON.parse(localStorage.getItem(code)));
  }
  return dashboardService.getDashboardByCode(code).pipe(
    catchError((error) => {
      console.error(error);
      return throwError(error);
    }),
  );
};

export default [
  {
    path: 'main',
    component: MainDashboardComponent,
  },
  {
    path: 'emp-performance',
    pathMatch: 'full',
    component: EmployeeSalePerformaceComponent,
  },
  {
    path: ':dashboardCode',
    pathMatch: 'full',
    component: DynaDashboardComponent,
    resolve: {
      dashboard: dashboardByCodeResolver
    }
  }
] as Routes;