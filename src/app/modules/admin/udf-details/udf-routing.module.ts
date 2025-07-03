import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { UdfDetailsComponent } from './udf-details.component';
import { UdfListComponent } from './udf-list/udf-list.component';


export default [{
  path: '',
  component: UdfDetailsComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: UdfListComponent
    }
  ]
 }] as Routes
