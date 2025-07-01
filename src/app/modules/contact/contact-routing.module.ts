import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
//import { CustomerService } from './customer.service';



// const userByIdResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   const contactService = inject(ContactService);
//   const userId = route.paramMap.get('id');
//   return contactService.getUser(userId).pipe(
//     catchError((error) => {
//       console.error(error);
//       return throwError(error);
//     }),
//   );
// };

export default [
  {
    path: '',
    component: ContactComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ContactListComponent
      },
      {
        path: 'add',
        component: ContactAddEditComponent
      },
     /* {
        path: 'edit/:id',
        component: ContactAddEditComponent,
        resolve: {
          user: userByIdResolver
        }
      }*/
    ]
  }

] as Routes;