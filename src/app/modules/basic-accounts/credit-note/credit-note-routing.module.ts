import { ActivatedRouteSnapshot,mapToCanActivate, RouterStateSnapshot, Routes } from '@angular/router';
import { CreditNoteAddEditComponent } from './credit-note-add-edit/credit-note-add-edit.component';
import { CreditNoteListComponent } from './credit-note-list/credit-note-list.component';
import { CreditNoteComponent } from './credit-note.component';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CreditNoteService } from './credit-note.service';
import { BankAddGuard,BankEditGuard,BankListGuard,BankModuleGuard,BankViewGuard} from 'app/core/auth/guards/bank.guards';

// const bankIdResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const bankService = inject(BankService);
//   const bankId = route.paramMap.get('id');
//   return bankService.getBankById(bankId).pipe(
//     catchError((error) => {
//       console.error(error);
//       return throwError(error);
//     }),
//   );
// };

  export default [
    {
      path: '',
      //  canActivate: mapToCanActivate([BankListGuard]),
      component: CreditNoteListComponent,

    },
    {
      path: 'add',
      // canActivate: mapToCanActivate([BankAddGuard]),
      component: CreditNoteAddEditComponent
    },
    {
      path: 'edit/:id',
      component: CreditNoteAddEditComponent,
      // canActivate: mapToCanActivate([BankEditGuard]),
      // resolve: {
      //  product: bankIdResolver
      // }
    },
    // {
      // path: 'view/:id',
      // component: BankViewComponent,
      // canActivate: mapToCanActivate([BankViewGuard]),
      // resolve: {
      //    bank: bankIdResolver
      // }
    // }
  ] as Routes;
