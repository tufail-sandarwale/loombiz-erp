import { ActivatedRouteSnapshot, mapToCanActivate, RouterStateSnapshot, Routes } from '@angular/router';

import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { PaymentService } from './payment.service';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentAddEditComponent } from './payment-add-edit/payment-add-edit.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { PaymentListGuard } from 'app/core/auth/guards/payment.guards';
import { PaymentViewGuard } from 'app/core/auth/guards/payment.guards';
import { PaymentEditGuard } from 'app/core/auth/guards/payment.guards';
import { PaymentAddGuard } from 'app/core/auth/guards/payment.guards';
import { PaymentModuleGuard } from 'app/core/auth/guards/payment.guards';

const paymentByIdResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const paymentService = inject(PaymentService);
  const paymentId = route.paramMap.get('id');
  return paymentService.getPaymentById(paymentId).pipe(
    catchError((error) => {
      console.error(error);
      return throwError(error);
    }),
  );
};


export default [
  {
    path: '',
    component: PaymentListComponent,
    canActivate:mapToCanActivate( [PaymentListGuard, PaymentModuleGuard]),
  },
  {
    path: 'add',
    component: PaymentAddEditComponent,
    canActivate:mapToCanActivate( [PaymentAddGuard])
  },
  {
    path: 'edit/:id',
    component: PaymentAddEditComponent,
    canActivate:mapToCanActivate( [PaymentEditGuard]),
    resolve: {
      payment: paymentByIdResolver
    }
  },
  {
    path: 'view/:id',
    component: PaymentViewComponent,
    canActivate:mapToCanActivate( [PaymentViewGuard]),
    resolve: {
      payment: paymentByIdResolver
    }
  }
] as Routes;