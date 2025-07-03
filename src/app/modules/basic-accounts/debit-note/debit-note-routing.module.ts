import { ActivatedRouteSnapshot,mapToCanActivate, RouterStateSnapshot, Routes } from '@angular/router';
import { DebitNoteAddEditComponent } from './debit-note-add-edit/debit-note-add-edit.component';
import { DebitNoteListComponent } from './debit-note-list/debit-note-list.component';
import { DebitNoteComponent } from './debit-note.component';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { DebitNoteService } from './debit-note.service';
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
      component: DebitNoteListComponent,

    },
    {
      path: 'add',
      // canActivate: mapToCanActivate([BankAddGuard]),
      component: DebitNoteAddEditComponent
    },
    {
      path: 'edit/:id',
      component: DebitNoteAddEditComponent,
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
