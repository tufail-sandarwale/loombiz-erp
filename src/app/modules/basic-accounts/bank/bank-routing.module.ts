import { ActivatedRouteSnapshot,mapToCanActivate, RouterStateSnapshot, Routes } from '@angular/router';
import { BankAddEditComponent} from './bank-add-edit/bank-add-edit.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { BankViewComponent } from './bank-view/bank-view.component';
import { BankComponent } from './bank.component';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { BankService } from './bank.service';
import { BankAddGuard,BankEditGuard,BankListGuard,BankModuleGuard,BankViewGuard} from 'app/core/auth/guards/bank.guards';

const bankIdResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const bankService = inject(BankService);
  const bankId = route.paramMap.get('id');
  return bankService.getBankById(bankId).pipe(
    catchError((error) => {
      console.error(error);
      return throwError(error);
    }),
  );
};

  export default [
    {
      path: '',
       canActivate: mapToCanActivate([BankListGuard]),
      component: BankListComponent,

    },
    {
      path: 'add',
      canActivate: mapToCanActivate([BankAddGuard]),
      component: BankAddEditComponent
    },
    {
      path: 'edit/:id',
      component: BankAddEditComponent,
      canActivate: mapToCanActivate([BankEditGuard]),
      resolve: {
       product: bankIdResolver
      }
    },
    {
      path: 'view/:id',
      component: BankViewComponent,
      canActivate: mapToCanActivate([BankViewGuard]),
      resolve: {
         bank: bankIdResolver
      }
    }
  ] as Routes;
