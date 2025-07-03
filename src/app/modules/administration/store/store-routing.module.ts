import { Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreAddEditComponent } from './store-add-edit/store-add-edit.component';


export default [

  
  {
      path     : '',
      component: StoreComponent,
      children:[
        {
          path: '',
          pathMatch: 'full',
         component: StoreListComponent,
        },
        {
          path: 'add-store',
          component: StoreAddEditComponent,
        },
        {
          path: 'edit-store/:id',
          component: StoreAddEditComponent,
        }
      ]
  }
] as Routes;