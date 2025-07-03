import { ActivatedRouteSnapshot,mapToCanActivate, RouterStateSnapshot, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ReceiptService } from './receipt.service';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { ReceiptAddEditComponent } from './receipt-add-edit/receipt-add-edit.component';
import { ReceiptListGuard, ReceiptModuleGuard } from 'app/core/auth/guards/receipt.guards';
import { ReceiptViewGuard } from 'app/core/auth/guards/receipt.guards';
import { ReceiptEditGuard } from 'app/core/auth/guards/receipt.guards';
import { ReceiptAddGuard } from 'app/core/auth/guards/receipt.guards';


const receiptByIdResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const receiptService = inject(ReceiptService);
  const receiptId = route.paramMap.get('id');
  return receiptService.getReceiptById(receiptId).pipe(
    catchError((error) => {
      console.error(error);
      return throwError(error);
    }),
  );
};


export default [
  {
    path: '',
    component: ReceiptListComponent,
    canActivate:mapToCanActivate( [ReceiptModuleGuard,ReceiptListGuard])
  },
  {
    path: 'add',
    component: ReceiptAddEditComponent,
    canActivate:mapToCanActivate( [ReceiptAddGuard])
  },
  {
    path: 'edit/:id',
    component: ReceiptAddEditComponent,
    canActivate:mapToCanActivate( [ReceiptEditGuard]),
    resolve: {
      receipt: receiptByIdResolver
    }
  } 
] as Routes;






