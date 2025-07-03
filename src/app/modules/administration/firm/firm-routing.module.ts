import { Routes } from '@angular/router';
import { FirmComponent } from './firm.component';
import { Component } from '@angular/core';
import { FirmListComponent } from './firm-list/firm-list.component';
import { FirmAddEditComponent } from './firm-add-edit/firm-add-edit.component';


export default [
  {
      path     : '',
      component: FirmComponent,
          children:[
            {
              path: '',
              pathMatch: 'full',
             component: FirmListComponent,
            },
            {
              path: 'add-firm',
              component: FirmAddEditComponent,
            },
            {
              path: 'edit-firm/:id',
              component: FirmAddEditComponent,
            }
          ]
  }
] as Routes;